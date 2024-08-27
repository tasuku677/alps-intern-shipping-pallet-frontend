async function sendImages(imageData){
    const response = await fetch('https://example.com/api/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'image/png',
        },
        body: JSON.stringify(imageData),
    });
    return response.json();
}

export { sendImages };