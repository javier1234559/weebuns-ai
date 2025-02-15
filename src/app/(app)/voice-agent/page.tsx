import VoiceAgent from "@/feature/speaking/components/VoiceAgent";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";

export default function VoiceAgentPage() {
  const breadcrumb = [{ title: "Voice Agent", href: RouteNames.VoiceAgent }];

  return (
    <div className="container mx-auto mt-20 max-w-7xl">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-8 w-full p-4">
        <h1 className="text-4xl font-bold">Voice Agent</h1>
      </div>
      <div className="mx-auto max-w-4xl p-4">
        <VoiceAgent />
      </div>
    </div>
  );
}
