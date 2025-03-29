import { RouteNames } from "@/constraints/route-name";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const { removeUser, removeToken } = useAuthStore();

  const handleLogout = async () => {
    const result = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      toast.success("Đăng xuất thành công");
      removeUser();
      removeToken();
      console.log("removeUser", removeUser);
      router.push(RouteNames.SignIn);
      window.location.reload();
    } else {
      toast.error("Đăng xuất thất bại");
    }
  };

  return { handleLogout };
};
