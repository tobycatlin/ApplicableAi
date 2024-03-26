import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@lib/db/prisma";
// import bcrypt from "bcrypt";
import find from "lodash/find";

const userList = [
  {
    user_id: "15e200fb",
    email: "user1@betin.com",
    name: "User One",
    role: "USER",
  },
  {
    user_id: "29290fc1",
    email: "user2@betin.com",
    name: "User Two",
    role: "USER",
  },
  {
    user_id: "48e2d579",
    email: "tobycatlin@gmail.com",
    name: "User Three",
    role: "USER",
  },
];
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
    // signUp: '/auth/signup',
    signOut: "/auth/signout",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      // const user = await prisma.user.findUnique({
      //   select: { role: true, user_id: true },
      //   where: {
      //     id: token.sub,
      //   },
      // });
      // const user = { role: "ADMIN", user_id: "123" };
      const user: any = find(userList, {
        email: token.email,
      });
      if (user) {
        // @ts-ignore
        session.user.role = user.role;
        // @ts-ignore
        session.user.user_id = user.id;
        // @ts-ignore
        session.user.displayName = token.name;
      }

      return session;
    },
    async jwt({ token }) {
      // const user = await prisma.user.findUnique({
      //   select: { role: true },
      //   where: {
      //     id: token.sub,
      //   },
      // });
      // const user = { role: "ADMIN", user_id: "123456" };
      // const user = find(userList, { user_id: token });
      const user: any = find(userList, {
        email: token.email,
      });

      // console.log("jwt", token);

      if (user) {
        token.role = user.role;

        return token;
      }

      return null as never;
    },
  },

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // console.log(credentials);

        // if (credentials?.username == "tobycatlin@gmail.com") {

        // }
        // Add logic here to look up the user from the credentials supplied
        // const user = {
        //   id: "123456",
        //   name: "John Smith",
        //   email: "jsmith@example.com",
        // };
        const user: any = find(userList, { email: credentials?.username });
        // console.log("prov", user);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
