import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import {addCircle, car, documentTextOutline, home, person} from 'ionicons/icons';
import VehiclesListPage from './vehicles/list/VehiclesListPage';
import VehicleDetail from './vehicles/detail/VehicleDetail';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../data/userSlice';
import AuctionsListPage from "./Auctions/AuctionsListPage/AuctionsListPage";
import AuctionDetailsPage from "./Auctions/AuctionDetailsPage/AuctionDetailsPage";
import AuctionFormPage from "./Auctions/AuctionFormPage/AuctionFormPage";
import UserProfile from "./User/UserProfile/UserProfile";

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
      <Route path="/tabs/auctions" component={AuctionsListPage} exact/>
      <Route path="/tabs/auctions/:id" component={AuctionDetailsPage} exact/>
          <Route path="/tabs/new" component={AuctionFormPage} exact/>
          <Route path="/tabs/profile" component={UserProfile} exact/>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab='new' href='/tabs/new'>
          <IonIcon icon={addCircle}/>
        </IonTabButton>
        <IonTabButton tab='auctions' href='/tabs/auctions'>
          <IonIcon icon={home}/>
        </IonTabButton>
        <IonTabButton tab='profil' href='/tabs/profile'>
          <IonIcon icon={person}/>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;