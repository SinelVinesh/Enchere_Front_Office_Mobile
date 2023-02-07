import axios from "axios";
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";
import { Plugins } from '@capacitor/core';
import {Preferences} from "@capacitor/preferences";
import {setNotificationToken} from "../data/dataApi";

const { LocalNotifications } = Plugins;

export const tokenBackEndRegistration = async (token: string | null) => {
     const data = {
          "token": token,
     }
     setNotificationToken(token).then((data) => {
          console.log("Enregistrement de l'appareil pour les notifications réussie")
     })
}


export const retreiveAndSaveToken = async () => {
     // Register with Apple / Google to receive push via APNS/FCM
     const notificationToken = await getNotificationToken()

     if (notificationToken == null || notificationToken == "" || notificationToken == undefined) {
          PushNotifications.register();
          // On success, we should be able to receive notifications
          PushNotifications.addListener('registration',
               (token: Token) => {
                    addNotificationToken(token.value);
                    //console.log(token);
                    console.log("le token " + JSON.stringify(token.value));
                    //alert('token: ' + token.value);
                    //demander notifaction
                    tokenBackEndRegistration(token.value);
                    showToast('Push registration success');
               }
          );
     } else {
          tokenBackEndRegistration(notificationToken);
     }
}

export const notificationsRegistration = (setter: (obj: any) => void, liste: any[]) => {
     retreiveAndSaveToken();
     //console.log('Initializing HomePage');

     // Some issue with our setup and push will not work
     PushNotifications.addListener('registrationError',
          (error: any) => {
               alert("Une erreur s'est produit lors de la configuration des notification : " + JSON.stringify(error));
          }
     );

     // Show us the notification payload if the app is open on our device
     PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotificationSchema) => {
               showNotification({ id: notification.id, title: notification.title, body: notification.body, type: 'foreground' });
               setter((liste: any) => [...liste, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
          }
     );

     // Method called when tapping on a notification
     PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: ActionPerformed) => {
               //showNotification({ id: notification.notification.data.id, title: "1" + notification.notification.data.title, body: notification.notification.data.body, type: 'action' });
               //setter((liste: any) => [...liste, { id: notification.notification.data.id, title: "1" + notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
          }
     );


}

export const showToast = async (msg: string) => {
     await Toast.show({
          text: msg
     })
}

export const showNotification = async (notif: any) => {
     console.log("ma date " + (new Date(Date.now() + 1000)));
     try {
          // Request/ check permissions
          if ((await LocalNotifications.requestPermission()).granted) {
               await LocalNotifications.schedule({
                    notifications: [{
                         title: notif.title,
                         body: notif.body,
                         id: new Date().getTime(),
                         schedule: { at: new Date(Date.now() + 1000) },
                         sound:null,
                         attachments: null,
                         actionTypeId: "",
                         extra: notif,
                         
                    }]
               });
          }
     } catch (error) {
          console.error("erreur notif" + error);
     }
}

export const getNotificationToken = async () => {
     const {value} = await Preferences.get({key:'notificationToken'});
}
export const addNotificationToken = (token: string) => {
     Preferences.set({key:"notificationToken",value: token});
}