import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/feature/auth/components/LogoutButton";
import ProfileForm from "@/feature/auth/components/ProfileForm";

export default function ProfileView() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Tài khoản của bạn</p>
      </div>
      <LogoutButton />
      <Separator />
      <ProfileForm />
    </div>
  );
}
