import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";

type GridOneProps = {
    images:any;
};

const GridOne = ({images}:GridOneProps) => {
    
    return  <Grid container xs={8} md={6} lg={4} sx={{overflow:'hidden'}}>
            <Grid container spacing={1} sx={{overflow:'hidden'}} >
                <Grid xs={4}>
                    <img  style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[0]} alt={'start image'}></img>
                </Grid>
                <Grid xs={8}>
                    <img style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[1]} alt={'start image'}/>
                </Grid>
                <Grid xs={6}>
                    <img  style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[2]} alt={'start image'}></img>
                </Grid>
                <Grid xs={6}>
                    <img style={{width:'100%',height:'100%',objectFit:'cover'}} src={images[3]} alt={'start image'}></img>
                </Grid>
            </Grid>
        </Grid>
}

export default GridOne;