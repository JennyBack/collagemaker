import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import EditPanel from "./EditPanel";
import ImageGrid from "./ImageGrid";
import ButtonsPanel from "./ButtonsPanel";
import AddImagesDialog from "./addImagesDialog/AddImagesDialog";
import useCreateGridColumnStyle from '../hooks/useCreateGridColumnStyle';
import useCheckImageDirection from "../hooks/useCheckImageDirection";
import useDisplayMode from "../hooks/useDisplayMode";

export type Image = {
    id: string;
    src: string;
    height: number;
    width: number;
}

type GridOneProps = {
    images: string[];
};

const CollageMaker = ({images}: GridOneProps) => {
    
    let defaultNoDisplayedImgs = 4;
    
    const [displayedImages, setDisplayedImages] = React.useState<Image[]>([]);
    const [noDisplayedImages,setNoDisplayedImages] = React.useState<number>(defaultNoDisplayedImgs);
    const [allImages,setAllImages] = React.useState<Image[]>([]);

    let {numberOfPortraitImages, numberOfLandscapeImages} = useCheckImageDirection(displayedImages);

    const {
        gridColumnStyle,
        handleStyleOne,
        handleStyleTwo,
        handleStyleThree,
        handleReset
    } = useCreateGridColumnStyle(numberOfPortraitImages, numberOfLandscapeImages, noDisplayedImages);
    
    const {
        showAddImagesDialog,
        showEditMode,
        setShowEditMode,
        setShowAddImagesDialog
    } = useDisplayMode();
    
    React.useEffect(() => {
        if(images.length > 0){
            images.map((image,index) => {
                const img = new Image();
                img.src = image;
                let UUID = crypto.randomUUID();
                img.onload = () =>
                    setAllImages((prev) => prev.concat([{
                        id: UUID,
                        src: image,
                        height: img.height,
                        width: img.width
                    }]))
            })
        }
    },[])
    
    React.useEffect(() => {
        if(allImages.length > 0 && displayedImages.length < 1){
            for(let i = 0; i <= defaultNoDisplayedImgs -1 ; i++){
                            setDisplayedImages((prev) => prev.concat([{
                                id: allImages[i].id,
                                src: allImages[i].src,
                                height: allImages[i].height,
                                width: allImages[i].width
                            }]))
            }
        }
    }, [allImages]);
    
    React.useEffect(() => {
        setNoDisplayedImages(displayedImages.length);
    },[displayedImages])

    const handleUpdateImages = (newArray) => {
        setDisplayedImages([...newArray]);
    }

    const handleAddImage = (newImage: Image) => {
        let imagesExistsInAddedImages = displayedImages.some((img) => img.src === newImage.src);

        if (!imagesExistsInAddedImages) {
            setDisplayedImages((prev) => {
                return prev.concat([{  id: newImage.id,
                    src: newImage.src,
                    height: newImage.height,
                    width: newImage.width}]);
            });
        }
    };

    const handleUncheckedImage = (image: Image) => {
        setDisplayedImages((current) =>
            current.filter((element) => element.id !== image.id)
        );
    };
    
    return (
        <Grid container xs={8} md={6} lg={4} flexDirection={'column'} sx={{height: '85%', flexWrap: 'noWrap'}}>
            <ImageGrid 
                showEditMode={showEditMode} 
                images={displayedImages} 
                gridColumnStyle={gridColumnStyle}
                handleUpdateImages={handleUpdateImages}
                onRemoveImage={handleUncheckedImage}
            />
            <ButtonsPanel
                showEditMode={showEditMode}
                setShowEditMode={setShowEditMode}
                showAddImagesDialog={showAddImagesDialog}
                setShowAddImagesDialog={setShowAddImagesDialog}
            />
            {showEditMode ?
                <EditPanel
                    handleStyleOne={handleStyleOne}
                    handleStyleTwo={handleStyleTwo}
                    handleStyleThree={handleStyleThree}
                    handleReset={handleReset}
                />
                : null}
            {showAddImagesDialog ?
                <AddImagesDialog 
                    open={showAddImagesDialog} 
                    displayedImages={displayedImages}
                    images={allImages}
                    handleClose={() => setShowAddImagesDialog(false)}
                    onAddImage={handleAddImage}
                    onUncheckedImage={handleUncheckedImage}
                /> : null}
        </Grid>
    );
}

export default CollageMaker;