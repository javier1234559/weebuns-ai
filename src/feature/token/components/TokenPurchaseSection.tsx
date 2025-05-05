import React, { useState } from "react";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TokenPackage } from "@/services/swagger-types";
import { useCreateTransaction } from "@/feature/token/hooks/useToken";
import { toast } from "sonner";

interface TokenPurchaseSectionProps {
  packages: TokenPackage[];
}

const TokenPurchaseSection = ({ packages }: TokenPurchaseSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { mutate: createTransaction } = useCreateTransaction();

  const handleCheckout = () => {
    if (selectedPlan) {
      console.log(selectedPlan);
      createTransaction(
        {
          packageCode: selectedPlan,
          paymentType: "momo",
        },
        {
          onSuccess: (data) => {
            console.log(data);
            window.location.href = data.paymentUrl;
          },
          onError: (error) => {
            console.log(error);
            toast.error("Lỗi khi thanh toán" + error.message);
          },
        },
      );
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mua Token</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <p className="text-muted-foreground">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {packages.map((plan) => (
              <Card
                key={plan.code}
                className={cn(
                  "relative flex min-w-[280px] max-w-[320px] grow cursor-pointer flex-col justify-between rounded-xl p-6 transition-all duration-200",
                  "border-2",
                  selectedPlan === plan.code
                    ? "border-primary ring-2 ring-primary"
                    : "border-transparent hover:border-primary/50",
                  "bg-card",
                )}
                style={{ minHeight: 200 }}
                onClick={() => setSelectedPlan(plan.code)}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4 z-10">
                    <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow">
                      Phổ biến
                    </span>
                  </div>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border",
                      selectedPlan === plan.code
                        ? "border-primary bg-primary"
                        : "border-muted",
                    )}
                  >
                    {selectedPlan === plan.code && (
                      <Check className="size-3 text-primary-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-2 flex items-end justify-between">
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(plan.price)}đ
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {plan.tokens} token
                  </p>
                </div>

                <div className="mb-2">
                  <p className="text-base text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {formatCurrency(plan.pricePerToken)}đ
                    </span>
                    {plan.oldPricePerToken && (
                      <span className="ml-1 text-muted-foreground line-through">
                        {formatCurrency(plan.oldPricePerToken)}đ
                      </span>
                    )}{" "}
                    <span className="text-xs">/ token</span>
                  </p>
                  <p className="mt-1 text-xs font-medium text-primary">
                    {plan.message}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-4 flex justify-start">
            <Button
              className="w-fit min-w-[180px] text-base"
              disabled={!selectedPlan}
              onClick={handleCheckout}
            >
              <CreditCard className="mr-2 size-5" />
              Thanh toán
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenPurchaseSection;
