import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCol,
    IonContent, IonDatetime,
    IonGrid, IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonNote,
    IonPage, IonPopover,
    IonRow,
    IonText,
    IonToast, IonToolbar, useIonLoading,
    useIonViewWillEnter
} from '@ionic/react';
import './Register.scss';
import {RouteComponentProps} from 'react-router';
import {register} from '../../../data/dataApi';
import {format, sub} from "date-fns";
import {fr} from "date-fns/locale";
import {User} from "../../../models/User";
import {Preferences} from "@capacitor/preferences";

interface OwnProps extends RouteComponentProps {
}

interface RegisterProps extends OwnProps {
}

const Register: React.FC<RegisterProps> = ({history}) => {
    const [present, dismiss] = useIonLoading();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameInvalid, setUsernameInvalid] = useState<string|boolean>(false);
    const [passwordInvalid, setPasswordInvalid] = useState<string|boolean>(false);
    const [passwordMatchInvalid, setPasswordMatchInvalid] = useState<string|boolean>(false)
    const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState<string|boolean>(false);
    const [emailInvalid, setEmailInvalid] = useState<string|boolean>(false);
    const [birthDate, setBirthDate] = React.useState<string>("")
    const [birthDateInvalid, setBirthDateInvalid] = React.useState<String|boolean>(false)
    const [showRegisterToast, setShowRegisterToast] = useState(false);
    const maxDate = sub(new Date(), {years: 18}).toISOString()
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameInvalid(false)
        setPasswordInvalid(false)
        setConfirmPasswordInvalid(false)
        setEmailInvalid(false)
        setPasswordMatchInvalid(false)
        let valid = true
        if (!username) {
            valid = false;
            setUsernameInvalid("Veuillez saisir un nom d'utilisateur");
        }
        // verifier si le nom d'utilisateur ne contient que des lettres, des chiffres, des tirets, des underscores et des points
        if (!/^[a-zA-Z0-9_.-]*$/.test(username)) {
            valid = false;
            setUsernameInvalid("Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets, des underscores et des points");
        }
        // verfier que le nom d'utilisateur contient au moins 4 caractères
        if (username.length < 4) {
            valid = false;
            setUsernameInvalid("Le nom d'utilisateur doit contenir au moins 4 caractères");
        }
        // verifier que le nom d'utilisateur ne contient pas plus de 20 caractères
        if (username.length > 20) {
            valid = false;
            setUsernameInvalid("Le nom d'utilisateur ne peut contenir plus de 20 caractères");
        }
        // verifier que le mot de passe contient au moins 8 caractères, au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre et au moins un caractère spécial
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/.test(password)) {
            valid = false;
            setPasswordInvalid("Le mot de passe doit contenir au moins 8 caractères, au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre et au moins un caractère spécial");
        }
        if (!password) {
            valid = false;
            setPasswordInvalid("Veuillez saisir un mot de passe");
        }
        if(!confirmPassword) {
            valid = false;
            setConfirmPasswordInvalid("Veuillez confirmer le mot de passe")
        }
        if(!email) {
            valid = false;
            setEmailInvalid("Veuillez saisir un email")
        }
        // verifier que l'email est valide
        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            valid = false;
            setEmailInvalid("L'email n'est pas valide");
        }
        if(!birthDate) {
            valid = false;
            setBirthDateInvalid("Veuillez saisir une date de naissance")
        }
        // verifier que la personne est majeure
        if (new Date(birthDate) > new Date(maxDate)) {
            valid = false;
            setBirthDateInvalid("Vous devez être majeur pour vous inscrire")
        }
        if(password != confirmPassword) {
            valid = false;
            setPasswordMatchInvalid("Les mots de passe ne correspondent pas")
        }
        if (valid) {
            const user: User = {
                username: username,
                birthDate: new Date(birthDate),
                email: email,
                password: password
            }
            present('Inscription en cours...');
            await register(user)
                .then((data) => {
                    console.log(data);
                    Preferences.set({key: "userToken", value: JSON.stringify(data)});
                    dismiss();
                    setShowRegisterToast(true);
                    history.push('/tabs/auctions', {direction: 'none'});
                })
                .catch((error: any) => {
                    if (error.response.status === 400) {
                    }
                });
        }
    };
    useIonViewWillEnter(() => {
        setUsername("Jean.Marie");
        setPassword("Motdepasse123*");
        setConfirmPassword("Motdepasse123*");
        setEmail("jean.Marie@gmail.com");
        setBirthDate("1990-01-01");
    })
    return (
        <IonPage id="login-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" color={"primary"}></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonToast
                    isOpen={showRegisterToast}
                    message={`Bienvenue sur la plateforme, ${username}`}
                    duration={3000}
                    onDidDismiss={() => setShowRegisterToast(false)}
                    color={"success"}
                    position="top"
                />
                <IonGrid className={"centered-grid"}>
                    <IonRow className={"centered-row"}>
                        <IonCol>
                            <IonText color={"primary"} className={"login-header"}>
                                <h2>Inscription</h2>
                            </IonText>
                            <form noValidate onSubmit={submit}>
                                <IonList>
                                    <IonItem className={`${usernameInvalid !== false && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Nom d'utilisateur</IonLabel>
                                        <IonInput name="username" type="text" value={username} spellCheck={false}
                                                  autocapitalize="off"
                                                  onIonChange={e => setUsername(e.detail.value!)}
                                                  required>
                                        </IonInput>
                                        <IonNote slot="helper">Au moins 8 lettres, chiffres ou _-.</IonNote>
                                        <IonNote slot="error">{usernameInvalid}</IonNote>
                                    </IonItem>

                                    <IonItem className={`${emailInvalid !== false && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Email</IonLabel>
                                        <IonInput name="username" type="text" value={email} spellCheck={false}
                                                  autocapitalize="off"
                                                  onIonChange={e => setEmail(e.detail.value!)}
                                                  required>
                                        </IonInput>
                                        <IonNote slot="error">{emailInvalid}</IonNote>
                                    </IonItem>

                                    <IonItem className={`${birthDateInvalid !== false && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Date de naissance</IonLabel>
                                        <IonInput id="birthDate" value={birthDate && format(new Date(birthDate),'dd MMMM yyyy', {locale: fr})} spellCheck={false}
                                                  autocapitalize="off"
                                                  required>
                                        </IonInput>
                                        <IonPopover trigger="birthDate" size={"cover"}>
                                            <IonDatetime
                                                presentation="date"
                                                value={birthDate}
                                                onIonChange={e => setBirthDate(e.detail.value! as string)}
                                                locale="fr"
                                                max={maxDate}
                                            ></IonDatetime>
                                        </IonPopover>
                                        <IonNote slot="error">{birthDateInvalid}</IonNote>
                                    </IonItem>

                                    <IonItem className={`${(passwordInvalid !== false || passwordMatchInvalid) && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Mot de passe</IonLabel>
                                        <IonInput name="password" type="password" value={password}
                                                  onIonChange={e => setPassword(e.detail.value!)}>
                                        </IonInput>
                                        <IonNote slot="helper">Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</IonNote>
                                        <IonNote slot="error">{ passwordInvalid || '' }</IonNote>
                                    </IonItem>

                                    <IonItem className={`${ (confirmPasswordInvalid !== false || passwordMatchInvalid) && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Confirmet le mot de passe</IonLabel>
                                        <IonInput name="password" type="password" value={confirmPassword}
                                                  onIonChange={e => setConfirmPassword(e.detail.value!)}>
                                        </IonInput>
                                        <IonNote slot="error">{confirmPasswordInvalid || passwordMatchInvalid}</IonNote>
                                    </IonItem>
                                </IonList>
                                <IonRow>
                                    <IonCol>
                                        <IonButton type="submit" expand="block">S'inscrire</IonButton>
                                    </IonCol>

                                </IonRow>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>

        </IonPage>
    );
};

export default Register