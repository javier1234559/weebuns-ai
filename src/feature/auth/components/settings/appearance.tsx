import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "@/feature/auth/components/settings/AppearanceForm";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          {"sections.appearance.description"}
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
