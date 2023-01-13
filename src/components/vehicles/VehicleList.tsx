import { IonItemGroup, IonList,IonItemDivider, IonLabel } from "@ionic/react";
import React from "react";
import { Vehicle } from "../../models/Vehicle";
import VehicleListItem from "./VehicleListItem";

interface VehicleListProps {
    vehicles: Vehicle[]
}

const VehicleList: React.FC<VehicleListProps> = ({vehicles}) => {
    return (

        <IonList>
            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>Liste des avions</IonLabel>
                </IonItemDivider>
                {vehicles.map((element) => (
                    <VehicleListItem vehicle={element}/>
                    ))}
            </IonItemGroup>
        </IonList>
    )
}

export default React.memo(VehicleList)