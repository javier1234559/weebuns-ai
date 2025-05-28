"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  type ProfileFormValues,
  defaultValues,
  profileFormSchema,
} from "./schema";
import { AuthProvider, type UserDto } from "@/services/swagger-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "../LogoutButton";
import { Separator } from "@/components/ui/separator";

interface ProfileFormProps {
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  isLoading: boolean;
  user: UserDto | null;
}

export default function ProfileForm({
  onSubmit,
  isLoading,
  user,
}: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...defaultValues,
      username: user?.username ?? "",
      email: user?.email ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      authProvider: user?.authProvider ?? AuthProvider.Local,
      isEmailVerified: user?.isEmailVerified ?? false,
      bio: user?.bio ?? "",
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    await onSubmit(values);
  };

  const getAuthProviderBadge = (provider: AuthProvider) => {
    const variants = {
      [AuthProvider.Local]: "secondary",
      [AuthProvider.Google]: "destructive",
      [AuthProvider.Facebook]: "default",
    } as const;

    return (
      <Badge variant={variants[provider]}>
        {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex gap-4">
        <div className="flex flex-col gap-2">
          <CardTitle>Thông tin tài khoản</CardTitle>
          <p className="text-sm text-muted-foreground">Tài khoản của bạn</p>
        </div>
        <LogoutButton className="max-w-fit" />
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>Tên đăng nhập</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="authProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phương thức đăng nhập</FormLabel>
                    <FormControl>
                      <div className="flex h-10 items-center">
                        {getAuthProviderBadge(field.value)}
                      </div>
                    </FormControl>
                    <FormDescription>Phương thức đăng nhập</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Email liên hệ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isEmailVerified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái email</FormLabel>
                    <FormControl>
                      <div className="flex h-10 items-center gap-2">
                        {field.value ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="size-5 text-green-500" />
                            <span className="text-sm">Đã xác thực</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <XCircle className="size-5 text-red-500" />
                            <span className="text-sm">Chưa xác thực</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Trạng thái xác thực</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên của bạn" {...field} />
                    </FormControl>
                    <FormDescription>Tên của bạn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên của bạn" {...field} />
                    </FormControl>
                    <FormDescription>Tên của bạn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới thiệu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nói về bản thân"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Bạn có thể viết một vài dòng về bản thân.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
