import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonToast, useIonViewWillEnter } from '@ionic/react';
import './Login.scss';
import { RouteComponentProps } from 'react-router';
import { userLogin } from '../data/dataApi';
import { useAppDispatch,useAppSelector } from '../app/hooks';
import { loggedIn, selectUser } from '../data/userSlice';

interface OwnProps extends RouteComponentProps {}

interface LoginProps extends OwnProps { }

const Login: React.FC<LoginProps> = ({history}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [loginResult,setLoginResult] = useState<"error"|"succes">("error");
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      await userLogin(username,password)
      .then((data) => {
        console.log(data.token);
        data.username = username;
        data.isLoggedIn = true;
        dispatch(loggedIn(data));
        setShowLoginToast(true);
        setLoginResult("succes");
        history.push('/tabs/vehicles', {direction: 'none'});
      })
      .catch((error) => {
        if(error.response.status == 400) {
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>
        <IonToast
          isOpen={showLoginToast}
          message={
            (loginResult == "error") ? 
              "Verifiez le nom d'utilisateur et/ou le mot de passe" : 
              "Connexion réussie"
          }
          duration={2000}
          onDidDismiss={()=>setShowLoginToast(false)}
          color = {(loginResult == "error") ? "danger" : "success"}
          position = "top"
        />
        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
          
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default Login