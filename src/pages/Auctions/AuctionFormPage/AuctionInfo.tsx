import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonCol, IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote, IonRow,
    IonSelect,
    IonSelectOption,
    IonTextarea
} from "@ionic/react";
import {Category} from "../../../models/Category";
import {getCategories} from "../../../data/dataApi";

interface AuctionInfoProps {
    nextPage: () => void
}

const AuctionInfo: React.FC<AuctionInfoProps> = ({nextPage}) => {
    // form data
    const [title, setTitle] = useState('');
    const [titleInvalid, setTitleInvalid] = useState<string|boolean>(false);
    const [description, setDescription] = useState('');
    const [descriptionInvalid, setDescriptionInvalid] = useState<string|boolean>(false);
    const [category, setCategory] = useState('');
    const [categoryInvalid, setCategoryInvalid] = useState<string|boolean>(false);
    const [startingPrice, setStartingPrice] = useState('');
    const [startingPriceInvalid, setStartingPriceInvalid] = useState<string|boolean>(false);
    const [startDate, setStartDate] = useState('');
    const [startDateInvalid, setStartDateInvalid] = useState<string|boolean>(false);
    const [bidStep, setBidStep] = useState('');
    const [bidStepInvalid, setBidStepInvalid] = useState<string|boolean>(false);

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data)
        })
    }, [])
    return (
        <IonGrid>
            <IonRow><IonCol><IonList>
                <IonItem className={`${titleInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Titre</IonLabel>
                    <IonInput name="username" type="text" value={title}
                              onIonChange={e => setTitle(e.detail.value!)}>
                    </IonInput>
                    <IonNote slot="error">{titleInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${descriptionInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Description</IonLabel>
                    <IonTextarea name="title" value={description} spellCheck={false}
                                 autocapitalize="off"
                                 rows={10}
                                 onIonChange={e => setDescription(e.detail.value!)}>
                    </IonTextarea>
                    <IonNote slot="error">{descriptionInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${categoryInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Categorie</IonLabel>
                    <IonSelect name="category" value={category} spellCheck={false}
                               onIonChange={e => setCategory(e.detail.value!)}>
                        {categories.map((category, index) => (
                            <IonSelectOption key={"cat" + index} value={category}>{category.name}</IonSelectOption>
                        ))}
                    </IonSelect>
                    <IonNote slot="error">{categoryInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${startingPriceInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Prix de départ</IonLabel>
                    <IonInput name="username" type="text" value={startingPrice} spellCheck={false}
                              autocapitalize="off"
                              onIonChange={e => setStartingPrice(e.detail.value!)}
                              required>
                    </IonInput>
                    <IonNote slot="error">{startingPriceInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${startDateInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Date de début</IonLabel>
                    <IonInput name="username" type="text" value={startDate} spellCheck={false}
                              autocapitalize="off"
                              onIonChange={e => setStartDate(e.detail.value!)}
                              required>
                    </IonInput>
                    <IonNote slot="error">{startDateInvalid}</IonNote>
                </IonItem>
                <IonItem className={`${bidStepInvalid !== false && 'ion-invalid'}`}>
                    <IonLabel position="floating" color="primary">Pas minimum des mises</IonLabel>
                    <IonInput name="username" type="text" value={bidStep} spellCheck={false}
                              autocapitalize="off"
                              onIonChange={e => setBidStep(e.detail.value!)}
                              required>
                    </IonInput>
                    <IonNote slot="error">{bidStepInvalid}</IonNote>
                </IonItem>
            </IonList></IonCol></IonRow>
            <IonRow>
                <IonCol>
                    <IonButton type="submit" expand="block" onClick={nextPage}>Suivant</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default AuctionInfo;