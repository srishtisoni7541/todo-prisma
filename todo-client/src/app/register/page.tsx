"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { authSchema } from "../lib/validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerUser } from "../services/auth";


type AuthSchema = z.infer<typeof authSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthSchema) => {
    try {
      const response = await registerUser(data);
      console.log("✅ Registered:", response);
      router.push("/login");
    } catch (err: any) {
      console.error("❌ Registration error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <h2 className="text-2xl font-bold">Register</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input {...register("name")} placeholder="Your Name" />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input {...register("email")} placeholder="example@gmail.com" />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label>Password</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label>Role</Label>
              <Select
                onValueChange={(val) =>
                  setValue("role", val as "USER" | "ADMIN")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
