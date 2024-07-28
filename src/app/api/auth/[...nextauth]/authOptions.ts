import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions:AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization:{
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    scope: "openid profile email"
                }
            }
        })
    ],
    callbacks: {
        signIn: async ({user, account, profile}) => {
            if(user.email === process.env.AUTHORIZED_USER){
                return true;
            }
            else{
                throw new Error("Unauthorized User");
            }
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60*60 //1h 
    },
    pages:{
        signIn: '/signin'
    },
    secret: process.env.NEXTAUTH_SECRET as string,
}

export default authOptions