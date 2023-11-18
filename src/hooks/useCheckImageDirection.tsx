import * as React from "react";

const getNumberOfPortraitImages = (images) => {
    let portraitsArray = [];
    images.map((image) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            if (img.height > img.width) {
                portraitsArray.push(image);
            }
        };
    })
    return portraitsArray;
}

const useCheckImageDirection = (images) => {
    
    const [portraitImages,setPortraitImages] = React.useState(getNumberOfPortraitImages(images));
    
    let numberOfLandscapeImages = images.length - portraitImages.length;
    let numberOfPortraitImages = portraitImages && portraitImages.length;
    
    return {
        numberOfPortraitImages,
        numberOfLandscapeImages
    }
}

export default useCheckImageDirection;