import { IonItem,IonLabel } from "@ionic/react";
import React from "react";
import { Kilometrage } from "../../models/Kilometrage";
import { Vehicle } from "../../models/Vehicle";

interface KilometrageListItemProps {
    kilometrage: Kilometrage
}

const KilometrageListItem: React.FC<KilometrageListItemProps> = ({kilometrage}) => {
    return (
        <IonItem>
            <IonLabel>
                <h3>Kilometrage #{kilometrage.id}</h3>
                <p><strong>Kilometres parcouru: </strong>{kilometrage.end - kilometrage.start}</p>
                <p><strong>Date du voyage: </strong>{`${kilometrage.date}`}</p>
                <p><strong>Compteur de départ: </strong>{kilometrage.start}</p>
                <p><strong>Compteur d'arrivée: </strong>{kilometrage.end}</p>
            </IonLabel>
        </IonItem>
    )
}

export default React.memo(KilometrageListItem); 