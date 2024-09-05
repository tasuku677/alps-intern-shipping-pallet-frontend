function checkEmployeeId(employeeId) {
    // Generate a random boolean value
    const randomValue = Math.random() < 0.5;
    return randomValue;
    // return true;
}

function checkPalletId(password) {
    // if (!(password.startsWith('P') || password.startsWith('S') || password.startsWith('M'))) {
    //     return false;
    // }
    // if (password.length < 10 || password.length > 20) {
    //     return false;
    // }
    // return true;
    const randomValue = Math.random() < 0.5;
    return randomValue;
}

function getTimeStamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hour}${minute}${second}`;
}

function checkNetworkConnection() {
    // Perform network connection check here
    // Return true if network is connected, false otherwise
    return navigator.connection;

}

function storeImage(imageData) {
    return ;
}
export { checkEmployeeId, checkPalletId, getTimeStamp, checkNetworkConnection, storeImage };

// invalid password: 間違った値は残しておく
// valid password: 既にある値は上書き．次のフォームに移動する
//　キーボードは出さない
