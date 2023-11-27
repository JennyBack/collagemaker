import * as React from 'react';
import {ForwardedRef} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {GridColumnStyle} from "../hooks/useCreateGridColumnStyle";
import {Skeleton} from "@mui/material";
import {Image} from "./CollageMaker";

type ImageGridProps = {
    images: any;
    gridColumnStyle: GridColumnStyle;
    handleUpdateImages: (newArray: Image[]) => void;
    showEditMode: boolean;
};

const swapElements = (arr:Image[], pos1:number, pos2:number) => {
    const temp = arr[pos1];
    arr[pos1] = arr[pos2];
    arr[pos2] = temp;

    return arr;
};

const ImageGrid = React.forwardRef(function ({
                                                 images,
                                                 gridColumnStyle,
                                                 handleUpdateImages,
                                                 showEditMode
                                             }: ImageGridProps, ref) {
    let {columnOne, columnTwo, columnThree, columnFour} = gridColumnStyle;
    let stylesArray = [4, 8, 6, 6];

    const handleDragStart = (event:React.DragEvent<HTMLElement>) => {
        event.dataTransfer.clearData('text');
        event.dataTransfer.setData('text', event.currentTarget.id);
        event.dataTransfer.effectAllowed = 'move';
    }

    const handleDragOver = (event:React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const handleDrop = (event:React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        let drop = event.dataTransfer.getData('text');
        let dropTo = event.currentTarget.id;

        let newArray:Image[] = swapElements(images, drop, dropTo);
        handleUpdateImages(newArray);
    }

    return <Grid container
                 spacing={1}
                 aria-label={'image-collage'}
                 sx={{
                     display: 'flex',
                     height: '100%',
                     width: '100%',
                     margin: '5px',
                     backgroundColor: 'white'
                 }}>
        {images.length > 0 ? images.map((image:Image, index:number) =>
                <Grid xs={stylesArray[index]}>
                    <img key={image.id}
                         id={index}
                         draggable={showEditMode}
                         onDragStart={handleDragStart}
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}
                         style={{
                             width: '100%',
                             height: '100%',
                             objectFit: 'cover'
                         }}
                         src={image.src}
                         alt={'start image'}/>
                </Grid>
            )
            : <Skeleton variant="rectangular" height={'100%'}/>}
    </Grid>
})


export default ImageGrid;
