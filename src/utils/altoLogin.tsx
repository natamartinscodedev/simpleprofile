import { signInWithEmailLink } from "firebase/auth"
import { GetDataUser } from "./getInfoUser"
import { VerificarChaveValida } from "./saveKeyLocalStorage"
import { auth } from "@/firebase/firebase"

export async function AltologinUser(router: any) {
    const Url = process.env.NEXT_PUBLIC_VERCEL_ENV
    const confirmOoobCode = localStorage.getItem('oobCode')
    const confirmApiKey = localStorage.getItem('apiKey')
    console.log('Check timeout and key', confirmApiKey, confirmOoobCode)

    if (VerificarChaveValida(confirmApiKey)) {
        const email = window.localStorage.getItem('emailForSignIn')
        const { User }: any = await GetDataUser(email)

        const actionCodeSettings: any = {
            url: `${Url}/User/${User.nameLink}?apiKey=${confirmApiKey}&oobCode=${confirmOoobCode}&mode=signIn&lang=en`,
            handleCodeInApp: true,
        }

        if (!email || !User) {
            alert('E-mail para login não encontrado, Faça login novamente!')
            return router.push('/Login')
        }

        try {
            if (confirmApiKey && confirmOoobCode) {
                await signInWithEmailLink(auth, email, actionCodeSettings)
                return router.replace(`/User/${User.nameLink}`)
            }

        } catch (error) {
            console.error('Erro ao completar o login com link mágico:', error)
            router.push('/error')
        }
    } else {
        return alert("Não foi possivel fazer seu login altomatico, seu token foi expirado. Por favor, faça login novamente!")
    }
}