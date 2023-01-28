import { Redirect, Route } from 'react-router-dom';
import { Provider} from 'react-redux';

import {connect} from 'react-redux';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse,home, square, triangle } from 'ionicons/icons';
import React from 'react';
import Accueil from './Accueil';
import Login from './Login';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */

import { ReactNode } from 'react';

setupIonicReact();

class LoginInsc extends React.Component{
constructor(props:any)
{
  super(props)
}
render(): ReactNode {
  return(
    
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Accueil />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/insc">
            <Accueil/>
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
        

    </IonReactRouter>

  </IonApp>
  
);
 }
}



  export default LoginInsc;
