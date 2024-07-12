import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from '@/firebase/firebase'

const Url = process.env.NEXT_PUBLIC_VERCEL_ENV

export function loginMagicLink(email: string) {
    try {
        sendSignInLinkToEmail(auth, email, {
            url: `${Url}/User`,
            handleCodeInApp: true,
        }).then(() => {
            window.localStorage.setItem('emailForSignIn', email);
        })
    } catch (error) {
        console.error('Erro ao enviar link de login mágico:', error);
    }
}

export default loginMagicLink;
