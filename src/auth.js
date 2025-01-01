import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { utcToIst } from './lib/convertTime';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                const { email, name } = user;
                const google_id = account?.providerAccountId;

                try {
                    let dbUser = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!dbUser) {
                        await prisma.user.create({
                            data: {
                                google_id,
                                email,
                                name,
                            },
                        });
                    } else {
                        await prisma.user.update({
                            where: { email },
                            data: {
                                last_login: utcToIst(new Date()),
                            },
                        });
                    }
                    return true;
                } catch (error) {
                    console.error('Error signing in:', error);
                    return false;
                }
            }
        },
    },
});
