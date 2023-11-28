import * as React from 'react';
import {Image} from "../CollageMaker";
import {Checkbox, FormControlLabel} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type AddImagesListItemProps = {
    image: Image;
    displayedImages: Image[];
    onAddImage: (image:Image) => void;
    onUncheckedImage: (image:Image) => void;
};

const isInCollage = (image,displayedImages) => {
    let exists = false;
    if(displayedImages.some(el => el.src === image.src)){
        exists = true;
    }
    return exists;
}

function AddImagesListItem({image, displayedImages, onAddImage, onUncheckedImage}: AddImagesListItemProps) {
    const [isChecked, setIsChecked] = React.useState(false);
    const [imgIsInCollage,setImgIsInCollage] = React.useState<boolean>(isInCollage(image,displayedImages))
    
React.useEffect(() => {
    if(imgIsInCollage){
        setIsChecked(true)
    }
    if(!imgIsInCollage){
        setIsChecked(false)
    }
},[imgIsInCollage])
    

    const handleOnChange = (e) => {
        if (e.target.checked) {
            onAddImage(image);
            setIsChecked(true);
        }
        if (e.target.checked === false) {
            onUncheckedImage(image);
            setIsChecked(false);
        }
    }
    return (image ? <FormControlLabel
        aria-label={'addable-image-item'}
        sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            padding: 0,
            margin: 0,
            position: 'relative'
        }}
        control={
            <Checkbox checked={isChecked} onChange={handleOnChange} value={image.id} key={image.id}
                      sx={{display: 'none'}}/>
        }
        label={
            <React.Fragment>
                <img style={{width: '135px', height: '135px', borderRadius: '4px', objectFit: 'cover', margin: '6px'}}
                     src={image.src} alt={image.src}/>
                {isChecked ? <CheckCircleIcon sx={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    color: 'white',
                    width: '30px',
                    height: 'auto'
                }}/> : null}
            </React.Fragment>
        }
    /> : null);
}

export default AddImagesListItem;