import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import EditPanel from "./EditPanel";
import ImageGrid from "./ImageGrid";
import ButtonsPanel from "./ButtonsPanel";
import AddImagesDialog from "./addImagesDialog/AddImagesDialog";
import useCreateGridColumnStyle from '../hooks/useCreateGridColumnStyle';
import useCheckImageDirection from "../hooks/useCheckImageDirection";

type GridOneProps = {
    images:any;
};

const CollageMaker = ({images}:GridOneProps) => {
    
    const [showEditMode,setShowEditMode] = React.useState<boolean>(false);
    const [showAddImagesDialog,setShowAddImagesDialog] = React.useState<boolean>(false);

    let {numberOfPortraitImages,numberOfLandscapeImages} = useCheckImageDirection(images);
    
    const {gridColumnStyle, handleStyleOne,handleStyleTwo,handleStyleThree,handleReset} = useCreateGridColumnStyle(numberOfPortraitImages,numberOfLandscapeImages,images.length);
    
    return(
        <Grid container xs={8} md={6} lg={4} flexDirection={'column'} sx={{height:'85%', flexWrap:'noWrap'}}>
           <ImageGrid images={images} gridColumnStyle={gridColumnStyle}/>
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