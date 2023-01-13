import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';
import { airplaneOutline, moonOutline, documentTextOutline, logIn, logOut,person, documentAttachOutline,} from 'ionicons/icons';


import './Menu.css'
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../data/userSlice';

const routes = {
  appPages: [
    { title: 'Avions', path: '/tabs/vehicles', icon: airplaneOutline },
  ],
  loggedInPages: [
    { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}


interface MenuProps extends RouteComponentProps { }

const Menu: React.FC<MenuProps> = ({}) => {
  const location = useLocation();
  const user = useAppSelector(selectUser);

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu  type="overlay" disabled={!true} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Avions</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Compte</IonListHeader>
          {user.isLoggedIn ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu)
