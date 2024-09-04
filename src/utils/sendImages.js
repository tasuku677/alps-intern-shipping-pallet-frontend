async function sendImages(photoBlobArray, employeeId, palletId) {
    const formData = new FormData();
    photoBlobArray.forEach((photo, index) => {
        formData.append('blobArray', photo.data, photo.name);  
    });
    formData.append('employeeId', employeeId);
    formData.append('palletId', palletId);

    const response = await fetch('http://127.0.0.1:8000/photos', {
        method: 'POST',
        body: formData,
    });
    return response;
}
// (async () => {
//     const response = await sendImages('wogiweimopwopomciewpmcei', '1', '1');
//     console.log(response);
// })();
export { sendImages };