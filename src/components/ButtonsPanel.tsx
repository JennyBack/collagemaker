import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";

type ButtonsPanelProps = {
    showEditMode: boolean;
    setShowEditMode: (showEditMode: boolean) => void;
    showAddImagesDialog: boolean;
    setShowAddImagesDialog: (showAddImagesDialog: boolean) => void;
};

const ButtonsPanel =
    ({showEditMode, setShowEditMode, showAddImagesDialog, setShowAddImagesDialog}: ButtonsPanelProps) => {
        return <Grid
            xs={12}
            display={'flex'}
            justifyContent={'flex-end'}
            alignContent={'center'}
            sx={{marginTop: '20px', gap: '20px'}} aria-label={'editing-buttons'}>
            {showEditMode ?
                <Tooltip title={'Add image to collage'}>
                    <AddPhotoAlternateIcon
                        color={"primary"}
                        sx={{cursor: 'pointer'}}
                        onClick={() => setShowAddImagesDialog(!showAddImagesDialog)}/>
                </Tooltip>
                : null}
            <Tooltip title={'Open edit mode'}>
                <EditIcon
                    color={"primary"}
                    onClick={() => setShowEditMode(!showEditMode)}
                    sx={{cursor: 'pointer'}}/>
            </Tooltip>
        </Grid>
    }

export default ButtonsPanel;