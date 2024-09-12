
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
        return response;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Network error or request failed:', error.message);
            return { status: 503, message: 'Service Unavailable' }; // 503 Service Unavailable
        } else {
            console.error('Unexpected error:', error.message);
            return { status: 500, message: 'Internal Server Error' }; // 500 Internal Server Error
        }
    }
}
// (async () => {
//     const response = await sendImages('wogiweimopwopomciewpmcei', '1', '1');
//     console.log(response);
// })();
export { sendImages };
