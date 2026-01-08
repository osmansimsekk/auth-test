import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { normalizeName, VALID_DOMAINS } from "./utils";
import { Gender, UserRole } from "@/src/generated/prisma";
import { admin } from "better-auth/plugins";
import { ac, roles } from "@/lib/permissions";
import { sendEmailAction } from "./actions/send-email.action";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 10 * 60,
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Şifre Sıfırlama",
        meta: {
          description:
            "Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın.",
          link: url,
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: user.email,
        subject: "Verify Your Email",
        meta: {
          description:
            "Please verify your email adress to complete registration.",
          link: String(link),
        },
      });
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  user: {
    additionalFields: {
      lastName: {
        type: "string",
        required: true,
      },
      gender: {
        type: ["MALE", "FEMALE"] as Array<Gender>,
        required: true,
      },
      country: {
        type: "string",
        required: true,
      },
      role: {
        type: [UserRole.ADMIN, UserRole.USER] as Array<UserRole>,
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];

          let firstName = (user.name as string) || "";
          let lastName = (user.lastName as string) || "";

          if (!lastName && user.name) {
            const split = splitFullName(user.name);
            firstName = split.name;
            lastName = split.lastName;
          }

          const role = ADMIN_EMAILS.includes(user.email)
            ? UserRole.ADMIN
            : UserRole.USER;

          return {
            data: {
              ...user,
              name: normalizeName(firstName || "User"),
              lastName: normalizeName(lastName!),
              gender: user.gender ?? "OTHER",
              country: user.country ?? "TR",
              role: role,
            },
          };
        },
      },
    },
  },

  session: {
    expiresIn: 30 * 24 * 60 * 60,
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/auth/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];

        if (!VALID_DOMAINS().includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Geçerli bir domain giriniz.",
          });
        }

        const name = normalizeName(ctx.body.name);
        const lastName = normalizeName(ctx.body.lastName);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
              lastName,
            },
          },
        };
      }
    }),
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    }),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return {
      name: parts[0],
      lastName: "-",
    };
  }

  return {
    name: parts.slice(0, -1).join(" "),
    lastName: parts.at(-1) ?? "",
  };
}
