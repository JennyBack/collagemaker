import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";

type EditPanelProps = {
    handleStyleOne:() => void;
    handleStyleTwo:() => void;
    handleStyleThree:() => void;
    handleReset:() => void;
}

function EditPanel({handleStyleOne,handleStyleTwo,handleStyleThree,handleReset}:EditPanelProps) {
    return <Grid xs={12} display={'flex'} flexDirection={'row'} aria-label={'edit-settings-panel'}>
        <Button onClick={handleReset}>Default</Button>
        <Button onClick={handleStyleOne}>Style one </Button>
        <Button onClick={handleStyleTwo}> Style two </Button>
        <Button onClick={handleStyleThree}> Style three </Button>
    </Grid>
}

export default EditPanel;