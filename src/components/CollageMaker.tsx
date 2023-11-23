import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import EditPanel from "./EditPanel";
import ImageGrid from "./ImageGrid";
import ButtonsPanel from "./ButtonsPanel";
import AddImagesDialog from "./addImagesDialog/AddImagesDialog";
import useCreateGridColumnStyle from '../hooks/useCreateGridColumnStyle';
import useCheckImageDirection from "../hooks/useCheckImageDirection";

type Image = {
id:number;
src:string;
height:number;
width:number;
}

type GridOneProps = {
    images:string[];
};

const CollageMaker = ({images}:GridOneProps) => {
    
    const [showEditMode,setShowEditMode] = React.useState<boolean>(false);
    const [showAddImagesDialog,setShowAddImagesDialog] = React.useState<boolean>(false);
    const [imagesArray, setImagesArray] = React.useState<Image[]>([]);

    let {numberOfPortraitImages,numberOfLandscapeImages} = useCheckImageDirection(imagesArray);
    
    const {gridColumnStyle, handleStyleOne,handleStyleTwo,handleStyleThree,handleReset} = useCreateGridColumnStyle(numberOfPortraitImages,numberOfLandscapeImages,imagesArray);
    
    const handleUpdateImages = (newArray) => {
        setImagesArray([...newArray]);
    }
    
    React.useEffect(() => {
        if(images.length > 0 && imagesArray.length < 1) {
            images.map((image, index) => {
                const img = new Image();
                img.src = image;
                    img.onload = () => 
                        setImagesArray((prev) => prev.concat([{id:index,src:image,height:img.height,width:img.width}]))
            });
           
        }
        },[]);
    
    return(
        <Grid container xs={8} md={6} lg={4} flexDirection={'column'} sx={{height:'85%', flexWrap:'noWrap'}}>
           <ImageGrid showEditMode={showEditMode} images={imagesArray} gridColumnStyle={gridColumnStyle} handleUpdateImages={handleUpdateImages}/>
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
            {showAddImagesDialog ? <AddImagesDialog open={showAddImagesDialog} handleClose={() => setShowAddImagesDialog(false)}/>:null}
        </Grid>
        );
}

export default CollageMaker;