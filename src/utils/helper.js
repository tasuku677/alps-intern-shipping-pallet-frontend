import getConfig from '../variable_config';

function checkEmployeeId(employeeId) {
    // Generate a random boolean value
    const employeeMask = new RegExp(getConfig['EMPLOYEE_VALIDATION_MASK']);
    return employeeMask.test(employeeId);
    // return true;
}

function checkPalletId(palletId) {
    const palletMask = new RegExp(getConfig['PALLET_VALIDATION_MASK']);
    return palletMask.test(palletId);
}
function getTimeStampISO(zoneSetting = 'LOCAL_WITH_DIF') {
    const date = new Date();
    if (zoneSetting === 'UTC') {
        return date.toISOString().split('.')[0] + 'Z';
    }
    else if (zoneSetting.includes('LOCAL')) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        if (zoneSetting.includes('DIF')) {
            const timezoneOffset = -date.getTimezoneOffset();
            const sign = timezoneOffset >= 0 ? '+' : '-';
            const offsetHour = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
            const offsetMinute = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
            return `${year}-${month}-${day}T${hour}:${minute}:${second}${sign}${offsetHour}:${offsetMinute}`;
        }
        return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    }
    else {
        return 'Invalid zone setting';
    }
}

function isoToPhotoTimestamp(isoString) {
    const date = new Date(isoString);
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
export { checkEmployeeId, checkPalletId, getTimeStampISO, isoToPhotoTimestamp, checkNetworkConnection};
