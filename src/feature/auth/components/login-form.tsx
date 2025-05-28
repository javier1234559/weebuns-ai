"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RouteNames } from "@/constraints/route-name";
import GoogleForm from "@/feature/auth/components/google-form";
import { useAuthStore } from "@/store/auth-store";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: yup.boolean().optional(),
});

type FormData = yup.InferType<typeof schema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      // Use the auth store to save user data
      useAuthStore.getState().setAuth({
        user: result?.user,
        token: result?.access_token,
      });

      toast.success("Login successful!");
      window.location.href = RouteNames.Home;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async (data: any) => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      console.log(result);
      console.log(result?.user);
      console.log(result?.access_token);

      // Use the auth store to save user data
      useAuthStore.getState().setAuth({
        user: result?.user,
        token: result?.access_token,
      });

      toast.success("Login successful!");
      window.location.href = RouteNames.Home;
      return result;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-[1000px] overflow-hidden rounded-3xl bg-card shadow-lg">
        <div className="grid lg:grid-cols-2">
          {/* Left Section - Updated with image and overlay */}
          <div className="relative h-full p-4">
            <div className="relative h-full overflow-hidden rounded-2xl">
              {/* Background Image */}
              <Image
                src="/images/auth/tree-of-mountant.jpg"
                alt="Tree of Mountant"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Content */}
              <div className="relative z-10 h-full bg-black/40 p-8 text-white">
                <h1 className="mb-12 text-2xl font-semibold">Ticketed.</h1>
                <div className="space-y-4">
                  <p className="text-xl">Purchase your own ticket,</p>
                  <p className="text-xl">Select the date and time,</p>
                  <p className="text-xl">Pay through the application,</p>
                  <p className="text-xl">And enjoy your holiday!</p>
                  <div className="mt-4 h-1 w-20 bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-8 lg:p-12">
            <div className="mx-auto max-w-md space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="mb-2 text-2xl font-bold">Welcome Back!</h2>
                <p className="text-muted-foreground">
                  Continue with Google or enter your details.
                </p>
              </div>

              <GoogleForm onSubmit={handleGoogleLogin} />
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="text-right">
                    <Link
                      href={RouteNames.ForgotPassword}
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>

              <div className="text-center text-sm">
                {"Doesn't have an account? "}
                <Link
                  href={RouteNames.SignUp}
                  className="text-primary hover:underline"
                >
                  Sign Up for free
                </Link>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href={RouteNames.Landing}
                className="text-sm text-muted-foreground hover:underline"
              >
                skip for now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
