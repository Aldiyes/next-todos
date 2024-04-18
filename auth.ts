import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getUserById } from '@/data/user';
import { getAccountByUserId } from './data/account';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: {
					id: user.id,
				},
				data: {
					emailVerified: new Date(),
				},
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			//& Allow OAuth without email verification
			if (account?.provider !== 'credentials') {
				return true;
			}

			//& Prevend sign in with email verification
			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) {
				return false;
			}

			//&
			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id,
				);

				if (!twoFactorConfirmation) {
					return false;
				}

				//& delete two factor confirmation for next sign in
				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id,
					},
				});
			}
			return true;
		},

		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			}

			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email ? token.email : '';
				session.user.isOAuth = token.isOAuth as boolean;
			}

			return session;
		},

		async jwt({ token }) {
			if (!token.sub) {
				return token;
			}

			const existingUser = await getUserById(token.sub);
			if (!existingUser) {
				return token;
			}

			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

			return token;
		},
	},
	adapter: PrismaAdapter(db),
	secret: process.env.AUTH_SECRET,
	session: { strategy: 'jwt' },
	...authConfig,
});
