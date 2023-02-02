import {
    IonButtons,
    IonContent,
    IonHeader, IonInput,
    IonItem,
    IonLabel, IonList,
    IonMenuButton, IonNote,
    IonPage,
    IonTitle,
    IonToolbar, useIonLoading
} from "@ionic/react";
import React, {useState} from "react";
import AuctionInfo from "./AuctionInfo";
import AuctionImages from "./AuctionImages";
import {Auction} from "../../../models/Auction";
import {saveAuction} from "../../../data/dataApi";
import {useHistory} from "react-router";

const AuctionFormPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [auction, setAuction] = useState<Auction>({})
    const [present, dismiss] = useIonLoading();
    const history = useHistory();
    const nextPage = () => {
        setPage(page + 1)
    }
    const prevPage = () => {
        setPage(page - 1)
    }
    let rendering = null

    const upload = async () => {
        present('Enregistrement de l\'enchère...')
        saveAuction(auction).then((data) => {
            console.log(data)
            dismiss()
            history.push('/tabs/auctions')
        })
    }

    switch (page) {
        case 1:
            rendering = <AuctionInfo nextPage={nextPage} setAuction={setAuction} auction={auction}/>
            break;
        case 2:
            rendering = <AuctionImages prevPage={prevPage} auction={auction} setAuction={setAuction} upload={upload}/>
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton color={"primary"} />
                    </IonButtons>
                    <IonTitle>Créer une enchère</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {rendering}
            </IonContent>
        </IonPage>
    )
}

export default AuctionFormPage;