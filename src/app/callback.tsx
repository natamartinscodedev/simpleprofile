// callback.tsx
import { useEffect } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '@/config/firebase';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        const handleSignIn = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email: any = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Por favor, confirme seu e-mail para entrar.');
                }

                try {
                    await signInWithEmailLink(auth, email, window.location.href);
                    console.log('Usuário autenticado com sucesso!');
                } catch (error) {
                    console.error('Erro ao autenticar usuário:', error);
                }
            }

            router.push('/');
        };

        handleSignIn();
    }, [router]);

    return <div>Processando...</div>;
};

export default Callback;