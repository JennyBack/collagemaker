import * as React from "react";

export type GridColumnStyle = {
    columnOne:{
        xs:number;
    };
    columnTwo:{
        xs:number;
    };
    columnThree:{
        xs:number;
    };
    columnFour:{
        xs:number;
    };
}

const getDefaultGridStyle = () => {
    let defaultGridColumnStyle: GridColumnStyle = {
        columnOne:{xs:8},columnTwo:{xs:4},columnThree:{xs:6},columnFour:{xs:6}
    }
    return defaultGridColumnStyle;
}


const useCreateGridColumnStyle = () => {
    const [gridColumnStyle,setGridColumnStyle] = React.useState<GridColumnStyle>(getDefaultGridStyle());
    const [resetToDefaultStyle,setResetToDefaultStyle] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        if(resetToDefaultStyle){
            setGridColumnStyle(getDefaultGridStyle())
        }
    },[resetToDefaultStyle])
    
    const handleReset = () => {
        setResetToDefaultStyle(() => true);
    }
    const handleStyleOne = () => {
        let newGridColumnStyle:GridColumnStyle = {
            columnOne:{xs:12},columnTwo:{xs:4},columnThree:{xs:4},columnFour:{xs:4}
        }
       setGridColumnStyle((prevState) => newGridColumnStyle);
        setResetToDefaultStyle(false);
    }
    const handleStyleTwo = () => {
        let newGridColumnStyle:GridColumnStyle = {
            columnOne:{xs:4},columnTwo:{xs:4},columnThree:{xs:4},columnFour:{xs:12}
        }
        setGridColumnStyle((prevState) => newGridColumnStyle);
        setResetToDefaultStyle(false);
    }
    const handleStyleThree = () => {
        let newGridColumnStyle:GridColumnStyle = {
            columnOne:{xs:6},columnTwo:{xs:6},columnThree:{xs:4},columnFour:{xs:8}
        }
        setGridColumnStyle((prevState) => newGridColumnStyle);
        setResetToDefaultStyle(false);
    }
    
    return {
        gridColumnStyle, handleStyleOne,handleStyleTwo,handleStyleThree,handleReset
    }
}

export default useCreateGridColumnStyle;