import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          // email: profile.email,
          email: "learnshullkudo@gmail.com",
          image: profile.picture,
        };
      },
    }),
  ],
});
