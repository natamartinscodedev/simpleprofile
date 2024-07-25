import { auth } from "@/firebase/firebase";
import { signInWithEmailLink } from "firebase/auth";

export const handleSignInWithEmailLink = async (router: any, nameLink: any) => {
    let email = window.localStorage.getItem('emailForSignIn')

    if (!email) {
        alert('E-mail para login não encontrado, Faça login novamente!')
        return router.push('/Login');
    }

    try {
        await signInWithEmailLink(auth, email, window.location.href)
        return router.replace(`/User/${nameLink}`)
    } catch (error) {
        console.error('Erro ao completar o login com link mágico:', error);
        router.push('/error');
    }
}
