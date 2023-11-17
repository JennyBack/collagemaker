import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import EditPanel from "./EditPanel";
import ImageGrid from "./ImageGrid";
import ButtonsPanel from "./ButtonsPanel";
import AddImagesDialog from "./addImagesDialog/AddImagesDialog";

type GridOneProps = {
    images:any;
};

const CollageMaker = ({images}:GridOneProps) => {
    
    const [showEditMode,setShowEditMode] = React.useState<boolean>(false);
    const [showAddImagesDialog,setShowAddImagesDialog] = React.useState<boolean>(false);
    
    return(
        <Grid container xs={8} md={6} lg={4} sx={{overflow:'hidden'}} flexDirection={'column'}>
           <ImageGrid images={images}/>
           <ButtonsPanel showEditMode={showEditMode} setShowEditMode={setShowEditMode} showAddImagesDialog={showAddImagesDialog} setShowAddImagesDialog={setShowAddImagesDialog}/>
            {showEditMode ? <EditPanel/> : null}
            {showAddImagesDialog ? <AddImagesDialog open={showAddImagesDialog} handleClose={() => setShowAddImagesDialog(false)}/>:null}
        </Grid>
        );
}

export default CollageMaker;