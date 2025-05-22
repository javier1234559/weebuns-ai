"use client";

import ProfileForm from "@/feature/auth/components/ProfileForm";
import { useAuthStore } from "@/store/auth-store";
import { ProfileFormValues } from "../ProfileForm/schema";
import { useUpdateUser } from "@/feature/user/hooks/useUser";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileView() {
  const { user, hasHydrated, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: updateUser } = useUpdateUser();

  const handleSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    setIsLoading(true);
    updateUser({
      id: user.id,
      data: {
        username: values.username,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.bio ?? "",
      },
    }, {
      onSuccess: (updatedUser) => {
        setUser({
          ...user,
          username: values.username,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          bio: values.bio ?? "",
        });
        toast.success("Cập nhật thông tin thành công");
      },
      onSettled: () => setIsLoading(false),
      onError: () => {
        toast.error("Cập nhật thông tin thất bại");
      },
    });
  };

  if (!hasHydrated) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">Tài khoản của bạn</p>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        user={user}
      />
    </div>
  );
}
