"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RouteNames } from "@/constraints/route-name";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import {
  defaultValues,
  schema,
  FormData,
} from "@/feature/auth/components/register-form/schema";

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Register failed");
        return;
      }

      // Use the auth store to save user data
      useAuthStore.getState().setAuth({
        user: result?.user,
        token: result?.access_token,
      });

      toast.success("Register successful!");
      router.push(RouteNames.Home);
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-[1000px] overflow-hidden rounded-3xl bg-card shadow-lg">
        <div className="grid lg:grid-cols-2">
          {/* Left Section - With image and overlay */}
          <div className="relative h-full p-4">
            <div className="relative h-full overflow-hidden rounded-2xl">
              {/* Background Image */}
              <Image
                src="/images/auth/building.jpg"
                alt="Building"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Content */}
              <div className="relative z-10 h-full bg-black/40 p-8 text-white">
                <h1 className="mb-12 text-2xl font-semibold">Sign up.</h1>
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

          {/* Right Section - Register Form */}
          <div className="p-8 lg:p-12">
            <div className="mx-auto max-w-md space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="mb-2 text-2xl font-bold">Tạo tài khoản</h2>
                <p className="text-muted-foreground">
                  Đăng ký để bắt đầu sử dụng tài khoản của bạn
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Tên</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Nhập tên của bạn"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Họ</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Nhập họ của bạn"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập của bạn"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email của bạn</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Xác nhận mật khẩu của bạn"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                </Button>
              </form>

              <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <Link
                  href={RouteNames.SignIn}
                  className="text-primary hover:underline"
                >
                  Đăng nhập ở đây
                </Link>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href={RouteNames.Landing}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  bỏ qua →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
