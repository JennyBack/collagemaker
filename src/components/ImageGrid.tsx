import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { GridColumnStyle } from '../hooks/useCreateGridColumnStyle';
import { Skeleton } from '@mui/material';
import { Image } from './CollageMaker';
import { Box } from '@mui/material';

type ImageGridProps = {
    images: Image[];
    gridColumnStyle: GridColumnStyle;
    handleUpdateImages: (newArray: Image[]) => void;
    showEditMode: boolean;
    onRemoveImage: (image: Image) => void;
};

const swapElements = (arr: Image[], pos1: number, pos2: number) => {
    const temp = arr[pos1];
    arr[pos1] = arr[pos2];
    arr[pos2] = temp;

    return arr;
};

const ImageGrid = React.forwardRef(function (
    { images, gridColumnStyle, handleUpdateImages, showEditMode }: ImageGridProps,
    ref
) {
    let { columnOne, columnTwo, columnThree, columnFour } = gridColumnStyle;
    let stylesArray = [4, 8, 6, 6];

    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.clearData('text');
        event.dataTransfer.setData('text', event.currentTarget.id);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        let drop: string = event.dataTransfer.getData('text');
        let droppedImgIndex: number = images.indexOf(images.find((img) => img.id === drop));
        let dropTo: string = event.currentTarget.id;
        let droppedToImgIndex: number = images.indexOf(images.find((img) => img.id === dropTo));

        let newArray: Image[] = swapElements(images, droppedImgIndex, droppedToImgIndex);
        handleUpdateImages(newArray);
    };

    return (
        <Grid container spacing={1} aria-label={'image-collage'}>
            <Box
                ref={ref}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    margin: 'auto',
                    padding: '4px',
                    width: '100%',
                    height: '100%',
                    flexWrap: 'wrap',
                    backgroundColor: 'white'
                }}
            >
                {images.length &&
                    images.map((image, index) => {
                        return (
                            <Grid key={image.id} md={stylesArray[index]}>
                                <img
                                    key={image.id}
                                    id={image.id}
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
                                    alt={'start image'}
                                />
                            </Grid>
                        );
                    })}
            </Box>
        </Grid>
    );
});

export default ImageGrid;
