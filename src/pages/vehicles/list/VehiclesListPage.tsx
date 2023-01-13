import React, { useState, useRef, useEffect } from 'react';

import { IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonLoading, useIonViewWillEnter, IonRow, IonCol, IonSelect, IonSelectOption, IonLabel, IonItem } from '@ionic/react';
import { options, search } from 'ionicons/icons';

import './VehiclesListPage.scss'


import VehicleList from '../../../components/vehicles/VehicleList';
import { getVehicles } from '../../../data/dataApi';
import { Vehicle } from '../../../models/Vehicle';
import { useDispatch } from 'react-redux';
import { selectPlanes, setPlanes } from '../../../data/planeSlice';
import { useAppSelector } from '../../../app/hooks';

const VehicleListPage: React.FC = () => {
  const dispatch = useDispatch();
  const vehicles = useAppSelector(selectPlanes)
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[] | undefined>(undefined)
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter,setFilter] = useState(-1);
  const [loading, setLoading] = useState(true);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const mode = getConfig()!.get('mode');
  const pageRef = useRef<HTMLElement>(null);

  useIonViewWillEnter(() => {
    if(!filteredVehicles) {
      getVehicles().then((data) => {
        dispatch(setPlanes(data));
        setFilteredVehicles(data)
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  },[vehicles])
  const ios = mode === 'ios';
  
  const doRefresh = () => {
    getVehicles().then((data) => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
      dispatch(setPlanes(data));
      setFilteredVehicles(vehicles!.slice())
      setLoading(false);
    });
  };

  const filterVehicles = (month:number) => {
    setFilter(month);
    setFilteredVehicles(vehicles?.filter((vehicle) => {
      if(month == -1) {
        return true;
      }
      const currentDate = new Date();
      const vehicleDate = new Date(vehicle.currentInsurance.end);
      const currentYear = currentDate.getFullYear();
      const vehicleYear = vehicleDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const vehicleMonth = vehicleDate.getMonth();
      const currentDay = currentDate.getDate();
      const vehicleDay = vehicleDate.getDate();
      const yearDiff = vehicleYear - currentYear;
      const monthDiff = vehicleMonth - currentMonth;
      return (yearDiff === 0 && monthDiff <= month) || (yearDiff === 1 && (monthDiff+12) <= month)
    }))
  }

  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {!ios && !showSearchbar &&
            <IonTitle>Avions</IonTitle>
          }
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Avions</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
        { loading &&
          <h1>Chargement...</h1>
        }
        {
          filteredVehicles &&
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Véhicules dont l'assurance expire après</IonLabel>
                <IonSelect value={filter} onIonChange={ e=> filterVehicles(e.detail.value!)}>
                  <IonSelectOption value="-1">--Tout afficher--</IonSelectOption>
                  <IonSelectOption value="1">1 mois</IonSelectOption>
                  <IonSelectOption value="3">3 mois</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        }
        { filteredVehicles &&
          <VehicleList
            vehicles={filteredVehicles!}
          />
        }
      </IonContent>

    </IonPage>
  );
};

export default React.memo(VehicleListPage);
