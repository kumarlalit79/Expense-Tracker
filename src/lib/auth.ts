import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import connectDb from "./db";
import User from "@/model/user.model";
import { DEFAULT_CATEGORIES } from "./defaultCategories";
import Category from "@/model/category.model";

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_Client_ID!,
      clientSecret: process.env.GOOGLE_Client_Secret!,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider == "google") {
        await connectDb();
        let existUser = await User.findOne({ email: user?.email });
        if (!existUser) {
          existUser = await User.create({
            name: user?.name,
            email: user?.email,
            image: user?.image,
          });

          const categoiresToInsert = DEFAULT_CATEGORIES.map((cat) => ({
            userId: existUser._id,
            name: cat
          }))
          await Category.insertMany(categoiresToInsert)
        }
        user.id = existUser._id as string;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default authOptions;
