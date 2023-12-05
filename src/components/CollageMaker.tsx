import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import EditPanel from './EditPanel';
import ImageGrid from './ImageGrid';
import ButtonsPanel from './ButtonsPanel';
import AddImagesDialog from './addImagesDialog/AddImagesDialog';
import useCreateGridColumnStyle from '../hooks/useCreateGridColumnStyle';
import useCheckImageDirection from '../hooks/useCheckImageDirection';
import { toJpeg } from 'html-to-image';
import useDisplayMode from '../hooks/useDisplayMode';
import { Box, Skeleton } from '@mui/material';

export type Image = {
    id: string;
    src: string;
    height: number;
    width: number;
};

type GridOneProps = {
    images: string[];
};

const CollageMaker = ({ images }: GridOneProps) => {
    let defaultNoDisplayedImg = 5;

    const [displayedImages, setDisplayedImages] = React.useState<Image[]>([]);
    const [noDisplayedImages, setNoDisplayedImages] = React.useState<number>(defaultNoDisplayedImg);
    const [allImages, setAllImages] = React.useState<Image[]>([]);

    React.useEffect(() => {
        if (images.length > 0) {
            images.map((image, index) => {
                const img = new Image();
                img.src = image;
                let UUID = crypto.randomUUID();
                img.onload = () =>
                    setAllImages((prev) =>
                        prev.concat([
                            {
                                id: UUID,
                                src: image,
                                height: img.height,
                                width: img.width
                            }
                        ])
                    );
            });
        }
    }, [images]);

    React.useEffect(() => {
        if (allImages.length > 0 && displayedImages.length < 1) {
            for (let i = 0; i < defaultNoDisplayedImg - 1; i++) {
                setDisplayedImages((prev) =>
                    prev.concat([
                        {
                            id: allImages[i].id,
                            src: allImages[i].src,
                            height: allImages[i].height,
                            width: allImages[i].width
                        }
                    ])
                );
            }
        }
    }, [allImages]);

    React.useEffect(() => {
        setNoDisplayedImages(displayedImages.length);
    }, [displayedImages]);

    const { numberOfPortraitImages, numberOfLandscapeImages } =
        useCheckImageDirection(displayedImages);

    const { showAddImagesDialog, showEditMode, setShowEditMode, setShowAddImagesDialog } =
        useDisplayMode();

    const { gridColumnStyle, handleStyleOne, handleStyleTwo, handleStyleThree, handleReset } =
        useCreateGridColumnStyle(numberOfPortraitImages, numberOfLandscapeImages, displayedImages);

    let imageGridRef: React.MutableRefObject<HTMLElement | undefined> = React.useRef();

    const htmlToImageConvert = () => {
        if (imageGridRef.current) {
            toJpeg(imageGridRef.current, { quality: 0.95 }).then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = 'collage-maker-img.jpeg';
                link.href = dataUrl;
                link.click();
            });
        }
    };

    const handleUpdateImages = (newArray: Image[]) => {
        setDisplayedImages([...newArray]);
    };

    const handleAddImage = (newImage: Image) => {
        let imagesExistsInAddedImages = displayedImages.some((img) => img.src === newImage.src);

        if (!imagesExistsInAddedImages) {
            setDisplayedImages((prev) => {
                return prev.concat([
                    {
                        id: newImage.id,
                        src: newImage.src,
                        height: newImage.height,
                        width: newImage.width
                    }
                ]);
            });
        }
    };

    const handleUncheckedImage = (image: Image) => {
        setDisplayedImages((current) => current.filter((element) => element.id !== image.id));
    };

    return (
        <Grid
            container
            xs={8}
            md={6}
            lg={4}
            flexDirection={'column'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                margin: 'auto',
                width: '100%',
                height: '100%'
            }}
        >
            {displayedImages.length > 0 ? (
                <ImageGrid
                    ref={imageGridRef}
                    showEditMode={showEditMode}
                    images={displayedImages}
                    gridColumnStyle={gridColumnStyle}
                    handleUpdateImages={handleUpdateImages}
                    onRemoveImage={handleUncheckedImage}
                />
            ) : (
                <Skeleton variant="rectangular" />
            )}
            <ButtonsPanel
                showEditMode={showEditMode}
                setShowEditMode={setShowEditMode}
                showAddImagesDialog={showAddImagesDialog}
                setShowAddImagesDialog={setShowAddImagesDialog}
                onDownload={htmlToImageConvert}
            />
            {showEditMode ? (
                <EditPanel
                    handleStyleOne={handleStyleOne}
                    handleStyleTwo={handleStyleTwo}
                    handleStyleThree={handleStyleThree}
                    handleReset={handleReset}
                />
            ) : null}
            {showAddImagesDialog ? (
                <AddImagesDialog
                    open={showAddImagesDialog}
                    displayedImages={displayedImages}
                    images={allImages}
                    handleClose={() => setShowAddImagesDialog(false)}
                    onAddImage={handleAddImage}
                    onUncheckedImage={handleUncheckedImage}
                />
            ) : null}
        </Grid>
    );
};

export default CollageMaker;
