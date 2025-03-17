import { RouteNames } from "@/constraints/route-name";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    logout();

    const result = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      toast.success("Đăng xuất thành công");
      router.push(RouteNames.SignIn);
    } else {
      toast.error("Đăng xuất thất bại");
    }
  };

  return { handleLogout };
};
