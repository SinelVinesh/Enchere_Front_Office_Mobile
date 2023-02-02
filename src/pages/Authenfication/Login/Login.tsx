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
    IonToast,
    useIonViewWillEnter
} from '@ionic/react';
import './Login.scss';
import {RouteComponentProps} from 'react-router';
import {userLogin} from '../../../data/dataApi';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {loggedIn, selectUser} from '../../../data/userSlice';
import {Link} from "react-router-dom";

interface OwnProps extends RouteComponentProps {
}

interface LoginProps extends OwnProps {
}

const Login: React.FC<LoginProps> = ({history}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [usernameInvalid, setUsernameInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [showLoginToast, setShowLoginToast] = useState(false);
    const [loginResult, setLoginResult] = useState<"error" | "succes">("error");
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setUsernameInvalid(false)
        setPasswordInvalid(false)
        if (!username) {
            setUsernameInvalid(true);
        }
        if (!password) {
            setPasswordInvalid(true);
        }

        if (username && password) {
            await userLogin(username, password)
                .then((data) => {
                    console.log(data.token);
                    data.username = username;
                    data.isLoggedIn = true;
                    dispatch(loggedIn(data));
                    setShowLoginToast(true);
                    setLoginResult("succes");
                    history.push('/tabs/vehicles', {direction: 'none'});
                })
                .catch((error: any) => {
                    if (error.response.status === 400) {
                        setShowLoginToast(true);
                        setLoginResult("error")
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
            <IonContent>
                <IonGrid className={"centered-grid"}>
                    <IonRow className={"centered-row"}>
                        <IonCol>
                            <IonToast
                                isOpen={showLoginToast}
                                message={
                                    (loginResult === "error") ?
                                        "Verifiez le nom d'utilisateur et/ou le mot de passe" :
                                        "Connexion réussie"
                                }
                                duration={2000}
                                onDidDismiss={() => setShowLoginToast(false)}
                                color={(loginResult === "error") ? "danger" : "success"}
                                position="top"
                            />
                            <IonText color={"primary"} className={"login-header"}>
                                <h2>Connexion</h2>
                            </IonText>
                            <form noValidate onSubmit={submit}>
                                <IonList>
                                    <IonItem className={`${usernameInvalid && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Nom d'utilisateur</IonLabel>
                                        <IonInput name="username" type="text" value={username} spellCheck={false}
                                                  autocapitalize="off"
                                                  onIonChange={e => setUsername(e.detail.value!)}
                                                  required>
                                        </IonInput>
                                        <IonNote slot="error">Nom d'utilisateur invalide</IonNote>
                                    </IonItem>

                                    <IonItem className={`${passwordInvalid && 'ion-invalid'}`}>
                                        <IonLabel position="floating" color="primary">Mot de passe</IonLabel>
                                        <IonInput name="password" type="password" value={password}
                                                  onIonChange={e => setPassword(e.detail.value!)}>
                                        </IonInput>
                                        <IonNote slot="error">Mot de passe invalide</IonNote>
                                    </IonItem>

                                    {formSubmitted && passwordInvalid && <IonText color="danger">
                                        <p className="ion-padding-start">
                                            Password is required
                                        </p>
                                    </IonText>}
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