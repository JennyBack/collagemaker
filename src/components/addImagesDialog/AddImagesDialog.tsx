import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, {PaperProps} from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {Image} from "../CollageMaker";
import {IconButton, List} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddImagesListItem from "./AddImagesListItem";

type AddImagesDialogProps = {
    open: boolean;
    handleClose: () => void;
    images: Image[];
    onAddImage: (image: Image) => void;
    onUncheckedImage: (image: Image) => void;
    displayedImages: Image[];
}

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const AddImagesDialog = ({
                             open,
                             handleClose,
                             images,
                             displayedImages,
                             onAddImage,
                             onUncheckedImage
                         }: AddImagesDialogProps) => {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                sx={{height: '100%'}}
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    Images
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                {images.length > 0 ? <DialogContent>
                    <List sx={{display: 'flex'}}>
                        {images.map((image, index) => {
                            return <AddImagesListItem
                                key={image.id} 
                                image={image} 
                                displayedImages={displayedImages} 
                                onAddImage={onAddImage}
                                onUncheckedImage={onUncheckedImage}/>
                        })}
                    </List>
                </DialogContent> : null}
            </Dialog>
        </React.Fragment>
    );
}

export default AddImagesDialog;
