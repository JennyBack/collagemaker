import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {GridColumnStyle} from "../hooks/useCreateGridColumnStyle";
import {Skeleton} from "@mui/material";

type ImageGridProps = {
    images:any;
    gridColumnStyle:GridColumnStyle;
    handleUpdateImages:(newArray:[]) => void;
    showEditMode:boolean;
};

const swapElements = (arr, pos1, pos2) => {
    const temp = arr[pos1];
    arr[pos1] = arr[pos2];
    arr[pos2] = temp;

    return arr;
};

const ImageGrid = ({images,gridColumnStyle, handleUpdateImages,showEditMode}: ImageGridProps) => {
    let {columnOne, columnTwo, columnThree, columnFour} = gridColumnStyle;
    let stylesArray = [columnOne, columnTwo, columnThree, columnFour];

    const handleDragStart = (e) => {
        e.dataTransfer.clearData('text');
        e.dataTransfer.setData('text', e.currentTarget.id);
        e.dataTransfer.effectAllowed = 'move';
    }

    const handleDragOver = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
    }

    const handleDrop = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
        let drop = ev.dataTransfer.getData('text');
        let dropTo = ev.currentTarget.id;
        
        let newArray = swapElements(images,drop,dropTo);
        handleUpdateImages(newArray);
    }

    return <Grid container spacing={1} aria-label={'image-collage'} sx={{height: '60vw', overflow: 'hidden'}}>{images.length > 0 ? images.map((image,index) => 
        <Grid xs={stylesArray[index].xs}>
            <img key={image.id} 
                 id={index} 
                 draggable={showEditMode}
                 onDragStart={handleDragStart}
                 onDragOver={handleDragOver}
                 onDrop={handleDrop} 
                 style={{width: '100%', height: '100%', objectFit: 'cover'}}
                 src={image.src} alt={'start image'}/>
        </Grid>
    )  
        : <Skeleton variant="rectangular"  height={'100%'} />}
    </Grid>
}
export default ImageGrid;
