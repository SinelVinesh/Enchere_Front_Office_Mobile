import { IonItemGroup, IonList,IonItemDivider, IonLabel } from "@ionic/react";
import React from "react";
import { Kilometrage } from "../../models/Kilometrage";
import KilometrageListItem from "./KilometrageListItem";

interface KilometrageListProps {
    kilometrages: Kilometrage[]
}

const KilometrageList: React.FC<KilometrageListProps> = ({kilometrages}) => {
    return (
        <IonList>
            <IonItemGroup>
                {kilometrages.map((element) => (
                    <KilometrageListItem kilometrage={element}/>
                    ))}
            </IonItemGroup>
        </IonList>
    )
}

export default React.memo(KilometrageList)