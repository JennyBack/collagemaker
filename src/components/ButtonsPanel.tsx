import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';

type ButtonsPanelProps = {
    showEditMode: boolean;
    setShowEditMode: (showEditMode: boolean) => void;
    showAddImagesDialog: boolean;
    setShowAddImagesDialog: (showAddImagesDialog: boolean) => void;
    onDownload: () => void;
};

const ButtonsPanel = ({
    showEditMode,
    setShowEditMode,
    showAddImagesDialog,
    setShowAddImagesDialog,
    onDownload
}: ButtonsPanelProps) => {
    return (
        <Grid
            xs={12}
            aria-label={'editing-buttons'}
            display={'flex'}
            justifyContent={'flex-end'}
            alignContent={'center'}
            sx={{
                marginTop: '20px',
                gap: '20px'
            }}
        >
            <Tooltip title={'download image'}>
                <DownloadIcon color={'primary'} sx={{ cursor: 'pointer' }} onClick={onDownload} />
            </Tooltip>
            <Tooltip title={'Add image to collage'}>
                <AddPhotoAlternateIcon
                    color={'primary'}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setShowAddImagesDialog(!showAddImagesDialog)}
                />
            </Tooltip>
            <Tooltip title={'Open edit mode'}>
                <EditIcon
                    color={'primary'}
                    onClick={() => setShowEditMode(!showEditMode)}
                    sx={{ cursor: 'pointer' }}
                />
            </Tooltip>
        </Grid>
    );
};

export default ButtonsPanel;
