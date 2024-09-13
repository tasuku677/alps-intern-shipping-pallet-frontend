const DEFAULT_CONFIG = {
    "API_URL": "http://127.0.0.1",
    "API_URL_EXEP": "http://192.168.100.43",
    "API_PORT": 8000,
    "EMPLOYEE_VALIDATION_MASK": "ALCZ\\d{8}",
    "PALLET_VALIDATION_MASK": "^[a-zA-Z]\\d{1,18}",
    "MINIMUM_PICTURES": 1,
    "MAXIMUM_PICTURES": 10,
    "INTERVAL_TIME": 1000
}

function getConfig(name, defaultValue = null, wrapper = x => x) {
    const value = process.env[name] || DEFAULT_CONFIG[name] || defaultValue;
    return wrapper(value);
  }

export { getConfig, DEFAULT_CONFIG };
