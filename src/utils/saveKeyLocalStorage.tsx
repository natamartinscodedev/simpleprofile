// Função para armazenar a chave e a data de expiração no localStorage
export function SaveKeyLocalStorage(apiKey: any, tempoExpiracaoMinutos: any) {
    const Now = new Date();
    const expiration: any = new Date(Now.getTime() + tempoExpiracaoMinutos * 60000)
    // 60000 ms = 1 minuto

    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('expiryTime', expiration.getTime());
}

// Função para verificar se a chave no localStorage está válida
export function VerificarChaveValida(apiKey: any) {
    const confirmApiKey = localStorage.getItem('apiKey');
    const expiryTime: any = localStorage.getItem('expiryTime');

    if (!confirmApiKey || !expiryTime) {
        // Chave ou tempo de expiração não estão presentes
        return false;
    }

    const Now = new Date().getTime();
    const timeRemaining = expiryTime - Now
    const tenMinutesInMilliseconds = 10 * 60 * 1000;

    if (timeRemaining <= tenMinutesInMilliseconds) {
        // Chave expirou
        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.removeItem('apiKey');
        window.localStorage.removeItem('expiryTime');

        return false;
    }

    try {
        if (confirmApiKey === apiKey && timeRemaining > tenMinutesInMilliseconds) {
            // Chave válida
            return true;
        }
    } catch (err) {
        console.log('Err ==>', err)
    }
}