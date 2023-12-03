import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import EditPanel from "./EditPanel";
import ImageGrid from "./ImageGrid";
import ButtonsPanel from "./ButtonsPanel";
import AddImagesDialog from "./addImagesDialog/AddImagesDialog";
import useCreateGridColumnStyle from '../hooks/useCreateGridColumnStyle';
import useCheckImageDirection from "../hooks/useCheckImageDirection";
import {toJpeg} from "html-to-image";

export type Image = {
    id: number;
    src: string;
    height: number;
    width: number;
}

type GridOneProps = {
    images: string[];
};

const CollageMaker = ({images}: GridOneProps) => {

    const [showEditMode, setShowEditMode] = React.useState<boolean>(false);
    const [showAddImagesDialog, setShowAddImagesDialog] = React.useState<boolean>(false);
    const [imagesArray, setImagesArray] = React.useState<Image[]>([]);

    let {numberOfPortraitImages, numberOfLandscapeImages} = useCheckImageDirection(imagesArray);

    const {
        gridColumnStyle,
        handleStyleOne,
        handleStyleTwo,
        handleStyleThree,
        handleReset
    } = useCreateGridColumnStyle(numberOfPortraitImages, numberOfLandscapeImages, imagesArray);

    const handleUpdateImages = (newArray:Image[]) => {
        setImagesArray([...newArray]);
    }

    let imageGridRef:React.MutableRefObject<HTMLElement | undefined> = React.useRef();

    const htmlToImageConvert = () => {
        if(imageGridRef.current) {
            toJpeg(imageGridRef.current, {quality: 0.95})
                .then(function (dataUrl) {
                    let link = document.createElement('a');
                    link.download = 'collage-maker-img.jpeg';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };
    
    React.useEffect(() => {
        if (images.length > 0 && imagesArray.length < 1) {
            images.map((image, index) => {
                const img = new Image();
                img.src = image;
                img.onload = () =>
                    setImagesArray((prev) => prev.concat([{
                        id: index,
                        src: image,
                        height: img.height,
                        width: img.width
                    }]))
            });

        }
    }, []);

    return (
        <Grid container xs={8} md={6} lg={4} 
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width:'100%',
                  margin:'auto'
              }}
              >
            <ImageGrid 
                ref={imageGridRef} 
                showEditMode={showEditMode} 
                images={imagesArray}
                gridColumnStyle={gridColumnStyle} 
                handleUpdateImages={handleUpdateImages}
            />
            <ButtonsPanel
                showEditMode={showEditMode}
                setShowEditMode={setShowEditMode}
                showAddImagesDialog={showAddImagesDialog}
                setShowAddImagesDialog={setShowAddImagesDialog}
                onDownload={htmlToImageConvert}
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
                <AddImagesDialog open={showAddImagesDialog} handleClose={() => setShowAddImagesDialog(false)}/> : null}
        </Grid>

    );
}

export default CollageMaker;