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
    IonTitle, IonToolbar, useIonLoading
} from "@ionic/react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {getUserProfile, host, submitReloadRequest, updateUserProfile} from "../../../data/dataApi";
import {User} from "../../../models/User";
import {Camera, CameraResultType, Photo} from "@capacitor/camera";
import {pencil} from "ionicons/icons";
import './UserProfile.css'
import {Preferences} from "@capacitor/preferences";
import {UserToken} from "../../../models/UserToken";
const UserProfile: React.FC = () => {
    const [present, dismiss] = useIonLoading();
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
    const submitChanges = () => {
        let valid = true
        setUsernameInvalid(false)
        // verifier si le nom d'utilisateur ne contient que des lettres, des chiffres, des tirets, des underscores et des points
        if (username && !/^[a-zA-Z0-9_.-]*$/.test(username)) {
            valid = false;
            setUsernameInvalid("Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets, des underscores et des points");
        }
        // verfier que le nom d'utilisateur contient au moins 4 caractères
        if (username && username.length < 4) {
            valid = false;
            setUsernameInvalid("Le nom d'utilisateur doit contenir au moins 4 caractères");
        }
        // verifier que le nom d'utilisateur ne contient pas plus de 20 caractères
        if (username && username.length > 20) {
            valid = false;
            setUsernameInvalid("Le nom d'utilisateur ne peut contenir plus de 20 caractères");
        }
        // verifier que le mot de passe contient au moins 8 caractères, au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre et au moins un caractère spécial
        if (newPassword && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/.test(newPassword)) {
            valid = false;
            setPasswordInvalid("Le mot de passe doit contenir au moins 8 caractères, au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre et au moins un caractère spécial");
        }
        if(newPassword && !newPasswordConfirm) {
            valid = false;
            setNewPasswordConfirmInvalid("Veuillez confirmer le nouveau mot de passe")
        }
        // verifier que l'email est valide
        if (email && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            valid = false;
            setEmailInvalid("L'email n'est pas valide");
        }
        if(newPassword && newPassword != newPasswordConfirm) {
            valid = false;
            setNewPasswordMatchInvalid("Les mots de passe ne correspondent pas")
        }
        if(valid) {
            const user: User = {
                username: username,
                email: email,
                password: newPassword,
                photo: image
            }
            present("Mis a jour du profile...")
            updateUserProfile(user).then((data) => {
                setUser(data)
                setIsOpen(false)
                dismiss()
            })
        }
    }

    const submitReload = async () => {
        setReloadInvalid(false);
        let valid = true;
        if(Number.parseFloat(reload) < 0) {
            setReloadInvalid("Veuillez saisir un montant valide")
        }
        if(valid) {
            present("Envoie de la demande...")
            const { value } = await Preferences.get({key: "userToken"})
            const userToken: UserToken | undefined = value ? JSON.parse(value) as UserToken : undefined
            const data = {
                user: {
                    id: userToken?.user.id
                },
                amount: Number.parseFloat(reload)
            }
            submitReloadRequest(data).then((data) => {
                dismiss()
                setIsReloadOpen(false)
            }).catch((error) => {
                dismiss()
                console.log(error)
            })
        }
    }

    useEffect(() => {
        present("Chargement en cours...")
        getUserProfile().then((data) => {
            setUser(data)
            console.log(data)
            setUsername(data?.username!)
            setEmail(data?.email!)
            dismiss()
        })
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton color={"primary"} />
                    </IonButtons>
                    <IonTitle>Mon profil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {user &&
                <>
                <div className={"detail-swiper"}>
                    <img alt="placeholder" src= {user.photo != undefined ? `${user.photo.photoPath}` : '/assets/img/ica-slidebox-img-1.png'} className={"auction-list-image"}/>

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
                        <span className={"w-100 detail-text"}>{user?.balance?.toLocaleString('fr-FR',{minimumFractionDigits: 2, minimumIntegerDigits: 2})} Ar</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Solde du compte utilisable:</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{user?.usableBalance?.toLocaleString('fr-FR',{minimumFractionDigits: 2, minimumIntegerDigits: 2})} Ar</span>
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
                        <span className={"w-100 detail-text"}>{ user && format(new Date(user?.birthDate!), 'dd MMMM yyyy', {locale: fr})}</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Date d'inscription: </strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{ user && format(new Date(user?.registrationDate!), 'dd MMMM yyyy', {locale: fr})}</span>
                    </IonRow>
                    <IonRow >
                        <IonCol><IonButton expand={"block"} color={"success"} onClick={openReloadModal}>Recharger mon compte</IonButton></IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol><IonButton expand={"block"} color={"primary"} onClick={openPreview}>Modifier mon profile</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                </>
                }
            </IonContent>
            {user &&
            <>
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
                    <img alt="placeholder" src={image != undefined ?`data:image/${image.format};base64,${image.base64String}` : user.photo != undefined ? `${user.photo.photoPath}` : '/assets/img/ica-slidebox-img-1.png'} className={"auction-list-image"}/>
                    <IonButton fill={"clear"} size={"large"} className={'image-modification-button'} onClick={uploadImage}>
                        <IonIcon icon={pencil} slot={"icon-only"} />
                    </IonButton>
                </div>
                <IonGrid className={"detail-body"}>
                    <IonList>
                        <IonItem className={`${usernameInvalid !== false && 'ion-invalid'}`} counter={true}>
                            <IonLabel position="floating" color="primary">Nom d'utilisateur</IonLabel>
                            <IonInput name="username" type="text" value={username} spellCheck={false}
                                      autocapitalize="off"
                                      onIonChange={e => setUsername(e.detail.value!)}
                                      maxlength={20}
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
                            <IonLabel position="floating" color="primary">Mot de pass actuel</IonLabel>
                            <IonInput name="username" type="text" value={password} spellCheck={false}
                                      autocapitalize="off"
                                      onIonChange={e => setPassword(e.detail.value!)}
                                      required>
                            </IonInput>
                            <IonNote slot="error">{passwordInvalid }</IonNote>
                        </IonItem>
                    </IonList>
                    <IonRow >
                        <IonCol><IonButton expand={"block"} color={"success"} onClick={submitChanges}>Confirmer</IonButton></IonCol>
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
                            <IonButton onClick={() => submitReload()}>Confirmer</IonButton>
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
            </>
            }
        </IonPage>

    )
}

export default UserProfile;