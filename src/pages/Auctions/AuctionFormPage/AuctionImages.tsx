import React from "react";
import {
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol, IonContent,
    IonGrid, IonHeader,
    IonIcon, IonImg, IonModal,
    IonRow, IonThumbnail, IonTitle, IonToolbar
} from "@ionic/react";
import {addCircle, addOutline, trash} from "ionicons/icons";
import {Camera, CameraResultType, Photo} from "@capacitor/camera";
import "./AuctionFormPage.css"
interface AuctionImagesProps {
    prevPage: () => void
}

const AuctionImages: React.FC<AuctionImagesProps> = ({ prevPage }) => {
    const [images, setImages] = React.useState<Photo[]>([]);
    const [activeImage, setActiveImage] = React.useState<Photo | undefined>(undefined);
    const [isOpen, setIsOpen] = React.useState(false);
    const uploadImage = async() => {
        const result = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64
        })
        setImages([...images, result]);
    }

    const deleteImage = (image: Photo) => {
        setImages(images.filter((img) => img !== image));
    }

    const openPreview = (image: Photo) => {
        setActiveImage(image);
        setIsOpen(true);
    }
    return(
        <>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Ajouter des photos</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="4" >
                                            <IonButton fill={"clear"} size={"large"} onClick={uploadImage}>
                                                <IonIcon icon={addCircle} slot={"icon-only"} />
                                            </IonButton>
                                        </IonCol>
                                        {images.map((image, index) => (
                                            <IonCol size="4" key={"img"+index}>
                                                <img src={`data:image/${image.format};base64,${image.base64String}`}
                                                     alt={"image"+index} className={'upload-image-preview'}
                                                     onClick={() => openPreview(image)}/>
                                                <IonButton fill={"clear"} size={"large"} onClick={() => deleteImage(image)} className={'upload-image-delete-button'}>
                                                    <IonIcon icon={trash} slot={"icon-only"} />
                                                </IonButton>
                                            </IonCol>
                                        ))}
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton type="button" expand="block" onClick={prevPage}>Précédent</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton type="button" expand="block">Enregistrer</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Fermer</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonImg src={`data:image/${activeImage?.format};base64,${activeImage?.base64String}`} />
                </IonContent>
            </IonModal>
        </>
    )
}

export default AuctionImages;