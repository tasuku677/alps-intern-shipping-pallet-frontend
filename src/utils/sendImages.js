async function sendImages(imageData, employeeId, palletId) {
    const response = await fetch('http://127.0.0.1:8000/photos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageData: imageData,
            employeeId: employeeId,
            palletId: palletId
        })
    });
    return await response.json();
}
// (async () => {
//     const response = await sendImages('wogiweimopwopomciewpmcei', '1', '1');
//     console.log(response);
// })();
export { sendImages };