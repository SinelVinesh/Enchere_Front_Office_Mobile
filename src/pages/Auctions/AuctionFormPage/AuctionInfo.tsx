import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonCol, IonDatetime, IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote, IonPopover, IonRow,
    IonSelect,
    IonSelectOption,
    IonTextarea
} from "@ionic/react";
import {Category} from "../../../models/Category";
import {getCategories} from "../../../data/dataApi";
import {fr} from "date-fns/locale";
import {format} from "date-fns";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {Auction} from "../../../models/Auction";

interface AuctionInfoProps {
    nextPage: () => void
    setAuction: (auction: Auction) => void
    auction: Auction
}

const AuctionInfo: React.FC<AuctionInfoProps> = ({nextPage, setAuction, auction}) => {
    // form data
    const [title, setTitle] = useState(auction.title ?? '');
    const [titleInvalid, setTitleInvalid] = useState<string|boolean>(false);
    const [description, setDescription] = useState(auction.description ?? '');
    const [descriptionInvalid, setDescriptionInvalid] = useState<string|boolean>(false);
    const [category, setCategory] = useState<Category | undefined>(auction.category);
    const [categoryInvalid, setCategoryInvalid] = useState<string|boolean>(false);
    const [startingPrice, setStartingPrice] = useState(auction.startingPrice?.toString() ?? "100");
    const [startingPriceInvalid, setStartingPriceInvalid] = useState<string|boolean>(false);
    const [startDate, setStartDate] = useState(auction.startDate?.toISOString() ?? '');
    const [startDateInvalid, setStartDateInvalid] = useState<string|boolean>(false);
    const [bidStep, setBidStep] = useState(auction.bidStep?.toString() ?? "100");
    const [bidStepInvalid, setBidStepInvalid] = useState<string|boolean>(false);
    const [categories, setCategories] = useState<Category[]>([])
    const minDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss", {locale: fr});
    const submit = () => {
        let valid = true;
        setTitleInvalid(false);
        setDescriptionInvalid(false)
        if (!title) {
            setTitleInvalid("Veuillez saisir un titre");
            valid = false;
        }
        if (title.length < 5) {
            setTitleInvalid("Le titre doit contenir au moins 5 caractères");
            valid = false;
        }
        if (!description) {
            setDescriptionInvalid("Veuillez saisir une description");
            valid = false;
        }
        if(!startingPrice) {
            setStartingPriceInvalid("Veuillez saisir un prix de départ");
            valid = false;
        }
        if(Number.parseFloat(startingPrice) < 100) {
            setStartingPriceInvalid("Le prix de départ doit d'au moins à 100 Ar");
            valid = false;
        }
        if(!startDate) {
            setStartDateInvalid("Veuillez saisir une date de début");
            valid = false;
        }
        if(!bidStep) {
            setBidStepInvalid("Veuillez saisir un pas de mise");
            valid = false;
        }
        if(Number.parseFloat(bidStep) < 100) {
            setBidStepInvalid("Le pas de mise doit être d'au moins 100 Ar");
            valid = false;
        }
        if(!category) {
            setCategoryInvalid("Veuillez sélectionner une catégorie");
            valid = false;
        }
        if(valid) {
            const newAuction: Auction = {};
            newAuction.title = title;
            newAuction.description = description;
            newAuction.categoryId = category?.id;
            newAuction.startingPrice = Number.parseFloat(startingPrice);
            newAuction.startDate = new Date(startDate);
            newAuction.bidStep = Number.parseFloat(bidStep);
            setAuction({...auction,...newAuction});
            nextPage();
        }
    }
    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data)
        })
    }, [])
    return (
        <IonGrid>
            <IonRow><IonCol><IonList>
                <IonItem className={`${titleInvalid !== false && 'ion-invalid'}`} counter={true}>
                    <IonLabel position="floating" color="primary">Titre</IonLabel>
                    <IonInput name="username" type="text" value={title} maxlength={50}
                              onIonChange={e => setTitle(e.detail.value!)}>
                    </IonInput>
                    <IonNote slot="error">{titleInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${descriptionInvalid !== false && 'ion-invalid'}`} counter={true}>
                    <IonLabel position="floating" color="primary">Description</IonLabel>
                    <IonTextarea value={description} spellCheck={false}
                                 autocapitalize="off"
                                 autoGrow={true}
                                 maxlength={500}
                                 onIonChange={e => setDescription(e.detail.value!)}>
                    </IonTextarea>
                    <IonNote slot="error">{descriptionInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${categoryInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Categorie</IonLabel>
                    <IonSelect value={category} spellCheck={false} compareWith={(a, b) => a?.id === b?.id}
                               onIonChange={e => setCategory(e.detail.value!)}>
                        {categories.map((category, index) => (
                            <IonSelectOption key={"cat" + index} value={category}>{category.name}</IonSelectOption>
                        ))}
                    </IonSelect>
                    <IonNote slot="error">{categoryInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${startingPriceInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Prix de départ</IonLabel>
                    <IonInput type="number" value={startingPrice} spellCheck={false}
                              autocapitalize="off"
                              min={100}
                              onKeyPress={(e) => {
                                  if(!/[0-9]/.test(e.key)) {
                                      e.preventDefault();
                                  }
                              }}
                              onIonChange={e => {
                                  setStartingPrice(e.detail.value!)
                              }}
                              step={"100"}
                              required>
                    </IonInput>
                    <IonNote slot="error">{startingPriceInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${startDateInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Date de début</IonLabel>
                    <IonInput id="startDate" value={startDate && format(new Date(startDate), 'dd MMMM yyyy à HH:mm', {locale: fr})} spellCheck={false}
                              required>
                    </IonInput>
                    <IonPopover trigger="startDate" size={"cover"}>
                        <IonDatetime
                            presentation="date-time"
                            value={startDate}
                            onIonChange={e => setStartDate(e.detail.value! as string)}
                            locale="fr"
                            min={minDate}
                        ></IonDatetime>
                    </IonPopover>
                    <IonNote slot="error">{startDateInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${bidStepInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Pas minimum des mises</IonLabel>
                    <IonInput name="username" type="number" value={bidStep}
                              min={100}
                              step={"100"}
                              onIonChange={e => setBidStep(e.detail.value!)}
                              required>
                    </IonInput>
                    <IonNote slot="error">{bidStepInvalid}</IonNote>
                </IonItem>
            </IonList></IonCol></IonRow>
            <IonRow>
                <IonCol>
                    <IonButton type="submit" expand="block" onClick={submit}>Suivant</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default AuctionInfo;