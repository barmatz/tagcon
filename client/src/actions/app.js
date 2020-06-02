export const APP_INIT = 'APP_INIT';

export const appInit = () => ({ type: APP_INIT });

export const APP_DATA_RECEIVED = 'APP_DATA_RECEIVED';

export const appDataReceived = ({ playlist, currentItem }) => ({ type: APP_DATA_RECEIVED, playlist, currentItem });
