async function sendImages(imageData, employeeId, palletId) {
    const response = await fetch('https://example.com/api/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'image/png',
        },
        body: {
            imageData: JSON.stringify(imageData),
            employeeId: employeeId,
            palletId: palletId
        }
    });
    return response.json();
}

export { sendImages };