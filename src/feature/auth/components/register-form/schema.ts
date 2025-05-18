import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

export type FormData = z.infer<typeof schema>;

export const defaultValues: FormData = {
  firstName: "Nguyen",
  lastName: "Van A",
  username: "nguyenvana",
  email: "nguyenvana@gmail.com",
  password: "123456",
  confirmPassword: "123456",
};

