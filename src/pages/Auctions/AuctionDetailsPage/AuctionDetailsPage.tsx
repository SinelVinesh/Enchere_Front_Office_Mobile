import React, {useEffect, useState} from "react";
import {
    IonBackButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage, IonRow, IonText,
    IonTitle,
    IonToolbar, useIonLoading
} from "@ionic/react";
import {useParams} from "react-router";
import {getAuction, host} from "../../../data/dataApi";
import Timer from "../../../components/common/Timer";
import { format } from 'date-fns'
import {fr} from "date-fns/locale";
import "./AuctionDetailsPage.css"
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/pagination'
import {Auction} from "../../../models/Auction";

interface AuctionDetailsPageParams {
    id: string
}

const AuctionDetailsPage: React.FC = () => {
    const { id } = useParams<AuctionDetailsPageParams>()
    const [auction, setAuction] = useState<Auction| undefined>(undefined)
    const [present, dismss] = useIonLoading()
    useEffect(() => {
        present({
            message: 'Chargement...'
        })
        getAuction(id).then((data) => {
            setAuction(data)
            dismss()
        })
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton color={"primary"} defaultHref="/tabs/auctions"/>
                    </IonButtons>
                    <IonTitle>{auction?.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {auction &&
                <>
                <div className={"detail-swiper"}>
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                    >
                        {auction?.images?.map((image, index) => (
                                <SwiperSlide key={image.photoPath!}>
                                    <img src={`${host}${image.photoPath!}`} alt={"Image"} className={"auction-list-image"}/>
                                </SwiperSlide>

                        ))
                        }
                        {auction?.images?.length === 0 &&
                            <SwiperSlide><img alt="placeholder" src="/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"}/></SwiperSlide>
                        }
                    </Swiper>
                </div>
                <IonGrid className={"detail-body"}>
                    <IonRow>
                        <IonCol>
                            <h3>
                                {auction?.title}
                            </h3>
                            <h4>
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
                            </h4>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Publié par :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>@{auction?.appUser?.username}</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Prix initiale :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{auction?.startingPrice?.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Description :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{auction?.description}</span>
                    </IonRow>
                    <IonRow>
                        <IonText color={"secondary"}>
                            <strong>Catégorie :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{auction?.category?.name}</span>
                    </IonRow>
                    <IonRow>
                        <IonText color={"secondary"}>
                            <strong>Durée de l'enchère :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>
                            Du <br />
                            {format(new Date(auction?.startDate!), 'dd MMMM yyyy à hh:mm', {locale: fr})} <br/>
                            au <br/>
                            {format(new Date(auction?.endDate!), 'dd MMMM yyyy à hh:mm', {locale: fr})}</span>
                    </IonRow>
                        <IonRow>
                            {
                                (auction.auctionState?.id === 1 || (auction.auctionState?.id === 2 && false)) ?
                                    <>
                                        <IonText color={"secondary"}>
                                            <strong>Mise actuelle</strong>
                                        </IonText>
                                        <br />
                                        <span className={"w-100 detail-text"}>
                                            Aucune mise actuellement
                                        </span>
                                    </>
                                    :
                                    auction.auctionState?.id === 2 && auction.topBid !== null ?
                                        <>
                                            <IonText color={"secondary"}>
                                                <strong>Mise actuelle</strong>
                                            </IonText>
                                            <br />
                                            <span className={"w-100 detail-text"}>
                                            {`@${auction.topBid?.appUser.username}: ${auction.topBid?.amount.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar`}
                                            </span>
                                        </>
                                        :
                                        auction.auctionState?.id === 3 && auction.topBid !== null ?
                                            <>
                                                <IonText color={"secondary"}>
                                                    <strong className={"card-subtitle"}>Mise finale :</strong>
                                                </IonText>
                                                <br />
                                                <span className={"w-100 detail-text"}>
                                                {`@${auction.topBid?.appUser.username}: ${auction.topBid?.amount.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar`}
                                                </span>
                                            </>
                                            :
                                            "Aucune mise n'a été effectuée"
                            }
                        </IonRow>
                </IonGrid>
                </>
                }
            </IonContent>
        </IonPage>
    )
}

export default AuctionDetailsPage