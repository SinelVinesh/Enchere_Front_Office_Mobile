import React, {useState} from 'react';
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonNote,
    IonPage,
    IonRow,
    IonText,
    IonToast, useIonLoading,
    useIonViewWillEnter
} from '@ionic/react';
import './Login.scss';
import {login} from '../../../data/dataApi';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {loggedIn, selectUser} from '../../../data/userSlice';
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import {Preferences} from "@capacitor/preferences";
import {AxiosError} from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameInvalid, setUsernameInvalid] = useState<string| boolean>(false);
    const [passwordInvalid, setPasswordInvalid] = useState<string| boolean>(false);
    const [showLoginToast, setShowLoginToast] = useState(false);
    const [loginResult, setLoginResult] = useState<string>("");
    const [present, dismiss] = useIonLoading();
    
    const history = useHistory();
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameInvalid(false)
        setPasswordInvalid(false)
        if (!username) {
            setUsernameInvalid("Veuillez saisir un nom d'utilisateur");
        }
        if (!password) {
            setPasswordInvalid("Veuillez saisir un mot de passe");
        }

        if (username && password) {
            present('Connexion en cours...')
            await login(username, password)
                .then((data) => {
                    console.log(data);
                    Preferences.set({key: "userToken", value: JSON.stringify(data)});
                    setShowLoginToast(true);
                    setLoginResult("Connexion réussie");
                    dismiss();
                    history.push('/tabs/auctions', {direction: 'none'});
                })
                .catch((error: AxiosError) => {
                    setPasswordInvalid((error.response?.data as any).error)
                    setUsernameInvalid('')
                    dismiss();
                });
        }
    };
    useIonViewWillEnter(() => {
        setUsername("Jean.Marie");
        setPassword("Motdepasse123*");
    })
    return (
        <IonPage id="login-page">
            <IonContent>
                <IonGrid className={"centered-grid"}>
                    <IonRow className={"centered-row"}>
                        <IonCol>
                            <IonToast
                                isOpen={showLoginToast}
                                message={loginResult}
                                duration={2000}
                                onDidDismiss={() => setShowLoginToast(false)}
                                color={"success"}
                                position="top"
                            />
                            <IonText color={"primary"} className={"login-header"}>
                                <h2>Connexion</h2>
                            </IonText>
                            <form noValidate onSubmit={submit}>
                                <IonList>
                                    <IonItem className={`${usernameInvalid !== false && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Nom d'utilisateur</IonLabel>
                                        <IonInput name="username" type="text" value={username}
                                                  onIonChange={e => {
                                                    setUsernameInvalid(false);
                                                    setUsername(e.detail.value!)
                                                  }}>
                                        </IonInput>
                                        <IonNote slot="error">{usernameInvalid}</IonNote>
                                    </IonItem>

                                    <IonItem className={`${passwordInvalid !== false && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Mot de passe</IonLabel>
                                        <IonInput name="password" type="password" value={password}
                                                  onIonChange={e => {
                                                      setPasswordInvalid(false);
                                                      setPassword(e.detail.value!)}}>
                                        </IonInput>
                                        <IonNote slot="error">{passwordInvalid}</IonNote>
                                    </IonItem>
                                </IonList>
                                <IonRow>
                                    <IonCol>
                                        <IonButton type="submit" expand="block">Se connecter</IonButton>
                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol className={"login-link"}>
                                        Pas encore de compte ?&nbsp;
                                        <Link to={"/register"}>
                                            <IonText>
                                                Creer un nouveau compte
                                            </IonText>
                                        </Link>
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

export default Login