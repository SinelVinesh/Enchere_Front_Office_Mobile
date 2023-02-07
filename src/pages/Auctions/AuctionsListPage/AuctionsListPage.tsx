import React, {useEffect, useState} from "react";
import {
    IonBackButton, IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent,
    IonMenuButton,
    IonPage, IonRefresher, IonRow, IonSearchbar, IonText,
    IonTitle,
    IonToolbar, useIonLoading,
    IonRefresherContent
} from "@ionic/react";
import {getAuctions, host} from "../../../data/dataApi";
import Timer from "../../../components/common/Timer";
import {RouteComponentProps, useHistory, useLocation} from "react-router";
import {search} from "ionicons/icons";
import {Auction} from "../../../models/Auction";


const AuctionsListPage: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([])
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [offset, setOffset] = useState(0)
    const history = useHistory();
    const location = useLocation<any>();
    const [present, dismiss] = useIonLoading();

    const loadMoreAuctions = (event:any) => {
        getAuctions(offset).then((data) => {
            setAuctions([...auctions, ...data])
            event.target.complete();
            if(data.length > 0) {
                setOffset(offset +1);
            }
        })
    }
    const initAuctions = async (event?: any) => {
        setOffset(1)
        await getAuctions(0).then((data) => {
            event?.detail.complete();
            setAuctions([...data]);
        })
    }
    useEffect(() => {
        present('Chargement des enchères en cours...')
        setOffset(1)
        initAuctions().then(() => {
            dismiss()
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
            <IonRefresher slot="fixed" onIonRefresh={initAuctions}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonText>
                                <h3>Dernieres encheres</h3>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    {auctions && auctions.map((auction) => (
                        <IonCard key={`auc-${auction.id}`}>
                            <img alt="placeholder" src={auction.images != undefined && auction.images[0] != undefined ? `${auction.images[0].photoPath!}` : '/assets/img/ica-slidebox-img-1.png'} className={"auction-list-image"} onClick={() => toDetail(auction.id!)}/>
                            <IonCardHeader>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        {auction.title}
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                        {
                                            auction.auctionState?.id === 1 ?
                                            <>Commence dans: <Timer expirationTime={new Date(auction.startDate!)} /></>
                                            :
                                            auction.auctionState?.id === 2 ?
                                            <>Se termine dans: <Timer expirationTime={new Date(auction.endDate!)}/></>
                                            :
                                            auction.auctionState?.id === 3 ?
                                            "Enchère terminée" : ""
                                        }
                                    </IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>

                                    <IonGrid fixed={true}>
                                        <IonRow>
                                            <p>{auction.description}</p>
                                        </IonRow>
                                        <IonRow>
                                            {
                                                (auction.auctionState?.id === 1 || (auction.auctionState?.id === 2 && auction.topBid === null)) ?
                                            <>
                                                <strong className={"card-subtitle"}>Prix de départ: </strong>
                                                <br />
                                                {auction.startingPrice?.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar
                                            </>
                                            :
                                            auction.auctionState?.id === 2 && auction.topBid !== null ?
                                            <>
                                            <strong className={"card-subtitle"}>Mise actuelle :</strong>
                                            <br />
                                            {`@${auction.topBid?.appUser.username}: ${auction.topBid?.amount.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar`}
                                            </>
                                            :
                                            auction.auctionState?.id === 3 && auction.topBid !== null ?
                                            <>
                                                <strong className={"card-subtitle"}>Mise finale :</strong>
                                                <br />
                                                {`@${auction.topBid?.appUser.username}: ${auction.topBid?.amount.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar`}
                                            </>
                                            :
                                            "Aucune mise"
                                            }
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCardHeader>
                        </IonCard>
                    ))}
                    {auctions.length === 0 &&
                    <IonRow class="ion-justify-content-center ion-align-tems-center">
                        <IonCol style={{textAlign: "center"}}>
                            <IonText color={"medium"}>
                                <h3>Aucune enchère en cours</h3>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    }
                    <IonInfiniteScroll
                        onIonInfinite={(e: CustomEvent<void>) => loadMoreAuctions(e)}>
                        <IonInfiniteScrollContent></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
            </IonGrid>
        </IonContent>
      </IonPage>
  )
}

export default AuctionsListPage