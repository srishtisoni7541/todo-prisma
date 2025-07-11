import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be 6+ chars" }),
  role: z.enum(["USER", "ADMIN"], { message: "Role is required" }),
});


export const loginSchema = z.object({
      email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be 6+ chars" }),

});
