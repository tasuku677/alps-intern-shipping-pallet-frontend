async function sendImages(photoBlobArray, employeeId, palletId) {
    const formData = new FormData();
    photoBlobArray.forEach((photo, index) => {
        formData.append('blobArray', photo.data, photo.name);
    });
    formData.append('employeeId', employeeId);
    formData.append('palletId', palletId);

    try {
        const response = await fetch('http://192.168.100.43:8000/photos', {
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



// {
//     palletId: 1,
//     employeeId: 1,
//     photos: [
//         {
//             name: 'photo1.jpg',
//         },
//         {
//             name: 'photo2.jpg',
//         },
//     ]
// },
// {
//     palletId: 2,
//     employeeId: 2,
//     photos: [
//         {
//             name: 'photo1.jpg',
//         },
//         {
//             name: 'photo2.jpg',
//         },
//     ]
// }