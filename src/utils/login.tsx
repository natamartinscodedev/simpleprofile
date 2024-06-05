import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from '@/firebase/firebase'

export function loginMagicLink(email: string) {
    try {
        sendSignInLinkToEmail(auth, email, {
            url: 'http://localhost:3000/User',
            handleCodeInApp: true,
        }).then(() => {
            window.localStorage.setItem('emailForSignIn', email);
        })
    } catch (error) {
        console.error('Erro ao enviar link de login mágico:', error);
    }
}

export default loginMagicLink;
