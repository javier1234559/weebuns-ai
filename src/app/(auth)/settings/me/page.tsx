import ProfileView from "@/feature/auth/components/settings/profile";

export default function Me() {
  return (
    <div className="container mx-auto mt-24 space-y-6">
      <div className="w-full py-2">
        <ProfileView />
      </div>
    </div>
  );
}
