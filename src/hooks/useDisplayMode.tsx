import * as React from 'react';

function useDisplayMode() {
    const [showEditMode, setShowEditMode] = React.useState<boolean>(false);
    const [showAddImagesDialog, setShowAddImagesDialog] = React.useState<boolean>(false);
    return {showEditMode, setShowEditMode,showAddImagesDialog,setShowAddImagesDialog}
}

export default useDisplayMode;