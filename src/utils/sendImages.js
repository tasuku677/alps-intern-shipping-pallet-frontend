
async function sendImages(employeeId, palletId, photoBlobArray) {
    const formData = new FormData();
    formData.append('employeeId', employeeId);
    formData.append('palletId', palletId);
    photoBlobArray.forEach((photo, index) => {
        formData.append(`isoTimeStampArray`, photo.isoTimeStamp);
        formData.append('blobArray', photo.data, photo.name);
    });

    try {
        const response = await fetch('/api/v1/photos', {
            method: 'POST',
            body: formData,
        });
        if(!response.ok){
            const error = await response.json();
            return { status: response.status, message: error.message || 'Unknown error occured' };
        }
        return response;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(error.message);
            return { status: 503, message: 'Service Unavailable' }; // 503 Service Unavailable
        } else {
            console.error('Unexpected error:', error.message);
            return { status: 500, message: 'There are some problems between frontend and backend.' }; // 500 Internal Server Error
        }
    }
}

export { sendImages };
