import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../db/model/user";
import connectToDatabase from "../../db/connection";
import { redirect } from 'next/navigation'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false;
      }
    },
    async session({ session, token, user }) {
      try {
        await connectToDatabase();

        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.id = dbUser._id;
        }
        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        throw error;
      }
    },
  },
});

export { handler as GET, handler as POST };