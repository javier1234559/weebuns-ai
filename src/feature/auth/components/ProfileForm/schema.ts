import { AuthProvider } from "@/services/swagger-types";
import { z } from "zod";

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not be longer than 50 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must not be longer than 50 characters." }),
  bio: z
    .string()
    .max(500, { message: "Bio must not be longer than 500 characters." })
    .optional(),
  authProvider: z.nativeEnum(AuthProvider),
  isEmailVerified: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const defaultValues: ProfileFormValues = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  bio: "",
  authProvider: AuthProvider.Local,
  isEmailVerified: false,
};
