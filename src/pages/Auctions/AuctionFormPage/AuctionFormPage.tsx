import {
    IonButtons,
    IonContent,
    IonHeader, IonInput,
    IonItem,
    IonLabel, IonList,
    IonMenuButton, IonNote,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useState} from "react";
import AuctionInfo from "./AuctionInfo";
import AuctionImages from "./AuctionImages";

const AuctionFormPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const nextPage = () => {
        setPage(page + 1)
    }
    const prevPage = () => {
        setPage(page - 1)
    }
    let rendering = null
    switch (page) {
        case 1:
            rendering = <AuctionInfo nextPage={nextPage}/>
            break;
        case 2:
            rendering = <AuctionImages prevPage={prevPage} />
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