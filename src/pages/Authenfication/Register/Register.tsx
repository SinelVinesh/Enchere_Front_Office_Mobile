import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCol,
    IonContent,
    IonGrid, IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonNote,
    IonPage,
    IonRow,
    IonText,
    IonToast, IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './Register.scss';
import {RouteComponentProps} from 'react-router';
import {userLogin} from '../../../data/dataApi';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {loggedIn, selectUser} from '../../../data/userSlice';
import {Link} from "react-router-dom";

interface OwnProps extends RouteComponentProps {
}

interface RegisterProps extends OwnProps {
}

const Register: React.FC<RegisterProps> = ({history}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [formSubmitted, setFormSubmitted] = useState<string|boolean>(false);
    const [usernameInvalid, setUsernameInvalid] = useState<string|boolean>(false);
    const [passwordInvalid, setPasswordInvalid] = useState<string|boolean>(false);
    const [passwordMatchInvalid, setPasswordMatchInvalid] = useState<string|boolean>(false)
    const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState<string|boolean>(false);
    const [emailInvalid, setEmailInvalid] = useState<string|boolean>(false);
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(false);
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
        if(password != confirmPassword) {
            valid = false;
            setPasswordMatchInvalid("Les mot de passe ne correspondent pas")
        }
        if (valid) {
            history.push('/auctions')
            await userLogin(username, password)
                .then((data) => {
                    console.log(data);
                    data.username = username;
                    dispatch(loggedIn(data));
                    history.push('/tabs/vehicles', {direction: 'none'});
                })
                .catch((error: any) => {
                    if (error.response.status === 400) {
                    }
                });
        }
    };
    useIonViewWillEnter(() => {
        setUsername("Jean");
        setPassword("123");
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
                                        <IonNote slot="error">Nom d'utilisateur invalide</IonNote>
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

                                    <IonItem className={`${(passwordInvalid !== false || passwordMatchInvalid) && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Mot de passe</IonLabel>
                                        <IonInput name="password" type="password" value={password}
                                                  onIonChange={e => setPassword(e.detail.value!)}>
                                        </IonInput>
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