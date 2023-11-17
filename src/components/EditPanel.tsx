import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";

function EditPanel() {
    return <Grid xs={12} display={'flex'} flexDirection={'row'} sx={{marginTop: '20px'}} aria-label={'edit-settings-panel'}>
        <Button>Style one </Button>
        <Button> Style two </Button>
        <Button> Style three </Button>
    </Grid>
}

export default EditPanel;