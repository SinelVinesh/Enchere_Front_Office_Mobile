import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import {car, documentTextOutline } from 'ionicons/icons';
import VehiclesListPage from './vehicles/list/VehiclesListPage';
import VehicleDetail from './vehicles/detail/VehicleDetail';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../data/userSlice';

interface MainTabsProps { }

interface Button {
  tab:string,
  title: string,
  path: string,
  icon: string
}

const route = {
  loggedInButtons: []
}

const MainTabs: React.FC<MainTabsProps> = () => {
  const user = useAppSelector(selectUser);

  function renderButtons(list:Button[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonTabButton tab={p.tab} href={p.path}>
          <IonIcon icon={documentTextOutline} />
          <IonLabel>{p.title}</IonLabel>
        </IonTabButton>
      ))
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/vehicles" render={() => <VehiclesListPage />} exact={true} />
        <Route path="/tabs/vehicles/:id" component={VehicleDetail} exact/>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab='vehicles' href='/tabs/vehicles'>
          <IonIcon icon={car}/>
          <IonLabel>Vehicles</IonLabel>
        </IonTabButton>
        { user.isLoggedIn && renderButtons(route.loggedInButtons) }
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;