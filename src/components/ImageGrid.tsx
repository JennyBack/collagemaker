import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {GridColumnStyle} from "../hooks/useCreateGridColumnStyle";

type ImageGridProps = {
    images:any;
    // gridColumnStyle:GridColumnStyle;
};

const getImageDimensions = (images) => {
    let imagesArray= [];
    images.map((image) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            return imagesArray.push({src:image,height:img.height,width:img.width});
        };
    })

    return imagesArray;
}

const ImageGrid = ({images}: ImageGridProps) => {
    // let {columnOne,columnTwo,columnThree,columnFour} = gridColumnStyle;
    const [imagesArray,setImagesArray] = React.useState(getImageDimensions(images));
    
    let gridColumnStyles:number[] = [
       12,4,4,4
    ];
    
    return <Grid container spacing={1} aria-label={'image-collage'} sx={{height:'100%',overflow:'hidden'}}>
        {imagesArray && imagesArray.map((image, index) => {
            let isPortrait = image.height > image.width;
            let imageIndex = index;
            
            if(images.length === 4) {
                if (isPortrait) {
                    return <Grid xs={4}>
                        <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={images[imageIndex]}
                             alt={'start image'}/>
                    </Grid>
                }
                        return < Grid
                        xs = {12
                        } >
                            < img
                        style = {
                        {
                            width: '100%', height: '100%', objectFit: 'cover'
                        }
                    }
                        src = {images[imageIndex]}
                        alt = {'start image'}
                        />
                    </Grid>
            }
        })}
            </Grid>
    
    
    // return  <Grid container spacing={1} aria-label={'image-collage'} sx={{height:'100%',overflow:'hidden'}} >
    //     <Grid xs={columnOne.xs}>
    //         <img  style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[1]} alt={'start image'}></img>
    //     </Grid>
    //     <Grid xs={columnTwo.xs}>
    //         <img style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[0]} alt={'start image'}/>
    //     </Grid>
    //     <Grid xs={columnThree.xs}>
    //         <img  style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[2]} alt={'start image'}></img>
    //     </Grid>
    //     <Grid xs={columnFour.xs}>
    //         <img style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[3]} alt={'start image'}></img>
    //     </Grid>
    // </Grid>
}

export default ImageGrid;