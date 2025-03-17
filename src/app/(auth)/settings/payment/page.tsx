import PaymentView from "@/feature/auth/components/settings/payment";

export default function Payment() {
  return (
    <div className="container mx-auto mt-24 space-y-6">
      <div className="w-full py-2">
        <PaymentView />
      </div>
    </div>
  );
}
