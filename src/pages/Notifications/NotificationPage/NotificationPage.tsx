import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonFooter,
    IonList,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonListHeader,
    IonText,
    IonButtons,
    IonMenuButton,
    IonIcon, IonSearchbar
} from '@ionic/react';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";
import {search} from "ionicons/icons";

interface NotificationPageProps {
    notifications: any[]
}

const NotificationPage :React.FC<NotificationPageProps> = ({notifications}) => {

    return (
        <IonPage id='main'>
            <IonHeader>
                <IonToolbar>
                            <IonButtons slot="start">
                                <IonMenuButton color={"primary"} />
                            </IonButtons>
                            <IonTitle>Notifications</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <IonListHeader mode="ios" lines="full">
                    <IonLabel>Notifications</IonLabel>
                </IonListHeader>
                {notifications.length !== 0 &&
                    <IonList>

                        {notifications.map((notif: any) =>
                            <IonItem key={notif.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3 className="notif-title">{notif.title}</h3>
                                    </IonText>
                                    <p>{notif.body}</p>
                                    {notif.type==='foreground' && <p>This data was received in foreground</p>}
                                    {notif.type==='action' && <p>This data was received on tap</p>}
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>}
            </IonContent>
        </IonPage >
    )
}

export default NotificationPage