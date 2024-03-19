function isBrowser() {
    return typeof window !== 'undefined';
}

const formatOdometer = (odometer: number | string) => {
    if (!Boolean(odometer)) return "N/A";

    odometer = odometer.toString()
    if (odometer?.length >= 7) return odometer;

    return `${"0".repeat(7 - odometer?.length)}${odometer}`
};

export {
    isBrowser,
    formatOdometer,
};