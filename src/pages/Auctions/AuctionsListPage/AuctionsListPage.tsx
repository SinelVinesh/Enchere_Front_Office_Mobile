import React, {useEffect, useState} from "react";
import {
    IonBackButton, IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon,
    IonMenuButton,
    IonPage, IonRow, IonSearchbar, IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {getAuctions} from "../../../data/dataApi";
import Timer from "../../../components/common/Timer";
import {useHistory} from "react-router";
import {search} from "ionicons/icons";

const AuctionsListPage: React.FC = () => {
    const [auctions, setAuctions] = useState<any[]>([])
    const [showSearchBar, setShowSearchBar] = useState(false)
    const history = useHistory();
    useEffect(() => {
        getAuctions().then((data) => {
            setAuctions(data)
        })
    }, [])
    const toDetail = (id: number) => {
        history.push(`/tabs/auctions/${id}`)
    }
  return (
      <IonPage id="auction-list-page">
        <IonHeader>
          <IonToolbar>
              {!showSearchBar &&
              <>
                <IonButtons slot="start">
                    <IonMenuButton color={"primary"} />
                </IonButtons>
                <IonTitle>Accueil</IonTitle>
                  <IonButtons slot="end">
                      <IonButton color={"primary"} onClick={() => {setShowSearchBar(true)}}>
                          <IonIcon icon={search}/>
                      </IonButton>
                  </IonButtons>
              </>
              }
              {showSearchBar &&
                  <IonSearchbar showCancelButton="always" onIonCancel={() => setShowSearchBar(false)} animated={true}></IonSearchbar>
              }
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonGrid>
                <>
                    <IonRow>
                        <IonCol>
                            <IonText>
                                <h3>Dernieres encheres</h3>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    {auctions && auctions.map((auction) => (
                        <IonCard key={`auc-${auction.id}`}>
                            <img alt="placeholder" src="/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"} onClick={() => toDetail(auction.id)}/>
                            <IonCardHeader>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        {auction.title}
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                        <Timer expirationTime={new Date(auction.endDate)}/>
                                    </IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>

                                    <IonGrid fixed={true}>
                                        <IonRow>
                                            <p>{auction.description}</p>
                                        </IonRow>
                                        <IonRow>
                                            <strong className={"card-subtitle"}>Mise actuelle :</strong>
                                            <br />
                                            {`@${auction.topBid.user.username}: ${auction.topBid.amount.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar`}
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCardHeader>
                        </IonCard>
                    ))}
                </>
            </IonGrid>
        </IonContent>
      </IonPage>
  )
}

export default AuctionsListPage