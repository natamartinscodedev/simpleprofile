// Função para armazenar a chave e a data de expiração no localStorage
export function SaveKeyLocalStorage(apiKey: any, oobCode: any) {
    const now = new Date().getTime();
    const expiryTime: any = now + 20 * 60 * 60 * 1000;

    localStorage.setItem('oobCode', oobCode);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('expiryTime', expiryTime);
}

export function VerificarChaveValida(apiKey: any) {
    const confirmOobCode = localStorage.getItem('oobCode');
    const confirmApiKey = localStorage.getItem('apiKey');
    const expiryTime: any = localStorage.getItem('expiryTime');

    if (!confirmOobCode || !confirmApiKey || !expiryTime) {
        return false;
    }

    try {
        // const intervalId = setInterval(() => {
        const Now = new Date().getTime()
        const timeRemaining = expiryTime - Now
        const oneMinuteInMilliseconds = 1 * 60 * 1000

        if (timeRemaining <= oneMinuteInMilliseconds) {
            window.localStorage.removeItem('emailForSignIn')
            window.localStorage.removeItem('apiKey')
            window.localStorage.removeItem('expiryTime')
        }
        // }, 1000)

        if (confirmApiKey === apiKey) {
            return true;
        }
    } catch (err) {
        console.log('Err ==>', err)
    }
}