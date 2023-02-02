import React, {useEffect} from "react";
import {
    IonBackButton, IonButton,
    IonButtons,
    IonCol, IonContent, IonDatetime,
    IonGrid,
    IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList,
    IonMenuButton, IonModal, IonNote,
    IonPage, IonPopover,
    IonRow, IonText,
    IonTitle, IonToolbar
} from "@ionic/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import Timer from "../../../components/common/Timer";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {getUser} from "../../../data/dataApi";
import {User} from "../../../models/User";
import {Camera, CameraResultType, Photo} from "@capacitor/camera";
import {addCircle, pencil} from "ionicons/icons";
import './UserProfile.css'
const UserProfile: React.FC = () => {
    const [user, setUser] = React.useState<User| undefined>(undefined)
    const [isOpen, setIsOpen] = React.useState(false)
    const [isReloadOpen, setIsReloadOpen] = React.useState(false)
    const [username, setUsername] = React.useState("")
    const [usernameInvalid, setUsernameInvalid] = React.useState<String|boolean>(false)
    const [email, setEmail] = React.useState("")
    const [emailInvalid, setEmailInvalid] = React.useState<String|boolean>(false)
    const [password, setPassword] = React.useState("")
    const [passwordInvalid, setPasswordInvalid] = React.useState<String|boolean>(false)
    const [newPassword, setNewPassword] = React.useState("")
    const [newPasswordInvalid, setNewPasswordInvalid] = React.useState<String|boolean>(false)
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("")
    const [newPasswordConfirmInvalid, setNewPasswordConfirmInvalid] = React.useState<String|boolean>(false)
    const [newPasswordMatchInvalid, setNewPasswordMatchInvalid] = React.useState<String|boolean>(false)
    const [birthDate, setBirthDate] = React.useState<string>("")
    const [birthDateInvalid, setBirthDateInvalid] = React.useState<String|boolean>(false)
    const [image, setImage] = React.useState<Photo|undefined>(undefined)
    const [reload, setReload] = React.useState('')
    const [reloadInvalid, setReloadInvalid] = React.useState<String|boolean>(false)

    const uploadImage = async() => {
        const result = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64
        })
        setImage(result)
    }
    const openPreview = () => {
        setIsOpen(true);
    }
    const openReloadModal = () => {
        setIsReloadOpen(true);
    }
    useEffect(() => {
        getUser().then((data) => {
            setUser(data)
        })
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton color={"primary"} />
                    </IonButtons>
                    <IonTitle>Mon profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={"detail-swiper"}>
                    <img alt="placeholder" src= "/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"}/>

                </div>

                <IonGrid className={"detail-body"}>
                    <IonRow class={"ion-margin-bottom"}>
                        <IonCol>
                            <IonText color={"secondary"}>
                                <h3>
                                    @{user?.username}
                                </h3>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Solde du compte:</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{user?.accountBalance?.toLocaleString('fr-FR',{minimumFractionDigits: 2})} Ar</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Solde du compte utilisable:</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{user?.accountUsableBalance?.toLocaleString('fr-FR',{minimumFractionDigits: 2})} Ar</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Email :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{user?.email}</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Date de naisssance: </strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{ user && format(user?.birthDate!, 'dd MMMM yyyy', {locale: fr})}</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Date d'inscription: </strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{ user && format(user?.registrationDate!, 'dd MMMM yyyy', {locale: fr})}</span>
                    </IonRow>
                    <IonRow >
                        <IonCol><IonButton expand={"block"} color={"success"} onClick={openReloadModal}>Recharger mon compte</IonButton></IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol><IonButton expand={"block"} color={"primary"} onClick={openPreview}>Modifier mon profile</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Fermer</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                <div className={"detail-swiper"}>
                    <img alt="placeholder" src={image != undefined ?`data:image/${image.format};base64,${image.base64String}` :"/assets/img/ica-slidebox-img-1.png"} className={"auction-list-image"}/>
                    <IonButton fill={"clear"} size={"large"} className={'image-modification-button'} onClick={uploadImage}>
                        <IonIcon icon={pencil} slot={"icon-only"} />
                    </IonButton>
                </div>
                <IonGrid className={"detail-body"}>
                    <IonList>
                        <IonItem className={`${usernameInvalid !== false && 'ion-invalid'}`}>
                            <IonLabel position="floating" color="primary">Nom d'utilisateur</IonLabel>
                            <IonInput name="username" type="text" value={username} spellCheck={false}
                                      autocapitalize="off"
                                      onIonChange={e => setUsername(e.detail.value!)}
                                      required>
                            </IonInput>
                            <IonNote slot="error">{usernameInvalid}</IonNote>
                        </IonItem>
                        <IonItem className={`${emailInvalid !== false && 'ion-invalid'}`}>
                            <IonLabel position="floating" color="primary">Email</IonLabel>
                            <IonInput name="username" type="text" value={email} spellCheck={false}
                                      autocapitalize="off"
                                      onIonChange={e => setEmail(e.detail.value!)}
                                      required>
                            </IonInput>
                            <IonNote slot="error">{usernameInvalid}</IonNote>
                        </IonItem>
                        <IonItem className={`${(newPasswordInvalid !== false || newPasswordMatchInvalid) && 'ion-invalid'}`}>
                            <IonLabel position="floating" color="primary">Nouveau mot de passe</IonLabel>
                            <IonInput name="username" type="text" value={newPassword} spellCheck={false}
                                      autocapitalize="off"
                                      onIonChange={e => setNewPassword(e.detail.value!)}
                                      required>
                            </IonInput>
                            <IonNote slot="error">{newPasswordInvalid || ''}</IonNote>
                        </IonItem>
                        <IonItem className={`${(newPasswordConfirmInvalid !== false || newPasswordMatchInvalid) && 'ion-invalid'}`}>
                            <IonLabel position="floating" color="primary">Confirmation du nouveau mot de passe</IonLabel>
                            <IonInput name="username" type="text" value={newPasswordConfirm} spellCheck={false}
                                      autocapitalize="off"
                                      onIonChange={e => setNewPasswordConfirm(e.detail.value!)}
                                      required>
                            </IonInput>
                            <IonNote slot="error">{newPasswordConfirmInvalid || newPasswordMatchInvalid}</IonNote>
                        </IonItem>
                        <IonItem className={`${passwordInvalid !== false && 'ion-invalid'}`}>
                            <IonLabel position="floating" color="primary">Mot de pass courant</IonLabel>
                            <IonInput name="username" type="text" value={password} spellCheck={false}
                                      autocapitalize="off"
                                      onIonChange={e => setPassword(e.detail.value!)}
                                      required>
                            </IonInput>
                            <IonNote slot="error">{passwordInvalid }</IonNote>
                        </IonItem>
                    </IonList>
                    <IonRow >
                        <IonCol><IonButton expand={"block"} color={"success"}>Confirmer</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                </IonContent>
            </IonModal>
            <IonModal isOpen={isReloadOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setIsReloadOpen(false)}>Fermer</IonButton>
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsReloadOpen(false)}>Confirmer</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonList>
                            <IonItem className={`${reloadInvalid !== false && 'ion-invalid'}`}>
                                <IonLabel position="floating" color="primary">Saisissez le montant de la recharge</IonLabel>
                                <IonInput name="recharge" type="number" value={reload} spellCheck={false}
                                          autocapitalize="off"
                                          onIonChange={e => setReload(e.detail.value!)}
                                          required>
                                </IonInput>
                                <IonNote slot="error">{reloadInvalid}</IonNote>
                            </IonItem>
                        </IonList>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </IonPage>

    )
}

export default UserProfile;