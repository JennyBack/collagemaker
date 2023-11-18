import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {GridColumnStyle} from "../hooks/useCreateGridColumnStyle";

type ImageGridProps = {
    images:any;
    gridColumnStyle:GridColumnStyle;
};

const ImageGrid = ({images,gridColumnStyle}: ImageGridProps) => {
    let {columnOne,columnTwo,columnThree,columnFour} = gridColumnStyle;
    return  <Grid container spacing={1} aria-label={'image-collage'} sx={{height:'100%',overflow:'hidden'}} >
        <Grid xs={columnOne.xs}>
            <img  style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[1]} alt={'start image'}></img>
        </Grid>
        <Grid xs={columnTwo.xs}>
            <img style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[0]} alt={'start image'}/>
        </Grid>
        <Grid xs={columnThree.xs}>
            <img  style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[2]} alt={'start image'}></img>
        </Grid>
        <Grid xs={columnFour.xs}>
            <img style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[3]} alt={'start image'}></img>
        </Grid>
    </Grid>
}

export default ImageGrid;