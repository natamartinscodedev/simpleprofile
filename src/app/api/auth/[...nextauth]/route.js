// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
// import { clientPromise } from '@/db/adapterEmailTrap'

const authOptions = {
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  // adapter: MongoDBAdapter(await clientPromise()),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/Login', // Página de login personalizada
    verifyRequest: '/auth/verify', // Página de verificação personalizada
    error: '/auth/error' // Página de erro personalizada
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redireciona para uma página específica após login
      if (url.startsWith('/')) {
        return `${baseUrl}/User`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl // Redireciona para a home se não for um redirecionamento interno
    }
  },
  debug: true
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
