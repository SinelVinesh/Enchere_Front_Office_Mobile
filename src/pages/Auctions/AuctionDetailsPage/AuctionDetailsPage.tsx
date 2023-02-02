import React from "react";
import {
    IonBackButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage, IonRow, IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {useParams} from "react-router";
import {getAuction} from "../../../data/dataApi";
import Timer from "../../../components/common/Timer";
import { format } from 'date-fns'
import {fr} from "date-fns/locale";
import "./AuctionDetailsPage.css"
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/pagination'

interface AuctionDetailsPageParams {
    id: string
}

const AuctionDetailsPage: React.FC = () => {
    const { id } = useParams<AuctionDetailsPageParams>()
    const auction = getAuction(Number.parseInt(id))
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton color={"primary"} defaultHref="/tabs/auctions"/>
                    </IonButtons>
                    <IonTitle>{auction.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={"detail-swiper"}>
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                    >
                        <SwiperSlide><img alt="placeholder" src="/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"}/></SwiperSlide>
                        <SwiperSlide><img alt="placeholder" src="/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"}/></SwiperSlide>
                        <SwiperSlide><img alt="placeholder" src="/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"}/></SwiperSlide>
                        <SwiperSlide><img alt="placeholder" src="/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"}/></SwiperSlide>
                        <SwiperSlide><img alt="placeholder" src="/assets/img/ica-slidebox-img-1.png" className={"auction-list-image"}/></SwiperSlide>
                    </Swiper>
                </div>
                <IonGrid className={"detail-body"}>
                    <IonRow>
                        <IonCol>
                            <h3>
                                {auction.title}
                            </h3>
                            <h4>
                                <Timer expirationTime={new Date(auction.endDate)}/>
                            </h4>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Publié par :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>@{auction.author.username}</span>
                    </IonRow>
                    <IonRow >
                        <IonText color={"secondary"}>
                            <strong>Description :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{auction.description}</span>
                    </IonRow>
                    <IonRow>
                        <IonText color={"secondary"}>
                            <strong>Catégorie :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>{auction.category.name}</span>
                    </IonRow>
                    <IonRow>
                        <IonText color={"secondary"}>
                            <strong>Durée de l'enchère :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>
                            Du <br />
                            {format(new Date(auction.startDate), 'dd MMMM yyyy à hh:mm')} <br/>
                            au <br/>
                            {format(new Date(auction.endDate), 'dd MMMM yyyy à hh:mm')}</span>
                    </IonRow>
                    <IonRow>
                        <IonText color={"secondary"} className={"card-subtitle"}>
                            <strong>Mise actuelle :</strong>
                        </IonText>
                        <span className={"w-100 detail-text"}>
                            {`@${auction.topBid.user.username}: ${auction.topBid.amount.toLocaleString('fr-Fr',{ minimumFractionDigits: 2, maximumFractionDigits: 2})} Ar`}
                            <br />
                            Le {format(new Date(auction.topBid.date), 'dd MMMM yyyy à hh:mm', {locale: fr})}
                        </span>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default AuctionDetailsPage