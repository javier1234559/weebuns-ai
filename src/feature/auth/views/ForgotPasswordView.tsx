"use client";

import { Card } from "@/components/ui/card";
import { RouteNames } from "@/constraints/route-name";
import { EmailForm } from "@/feature/auth/components/email-form";
import { RecoveryCodeForm } from "@/feature/auth/components/recovery-code-form";
import { ResetPasswordForm } from "@/feature/auth/components/reset-password-form";
import authApi from "@/feature/auth/services/authApi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ForgotPasswordStep = "email" | "code" | "reset";

const STEPS: { [key in ForgotPasswordStep]: number } = {
  email: 0,
  code: 1,
  reset: 2,
};

const STEP_LABELS: { [key in ForgotPasswordStep]: string } = {
  email: "Email",
  code: "Verification",
  reset: "New Password",
};

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const formTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [canNavigateToStep, setCanNavigateToStep] = useState({
    email: true,
    code: false,
    reset: false,
  });

  const handleStepClick = (step: ForgotPasswordStep) => {
    if (canNavigateToStep[step] && STEPS[step] < STEPS[currentStep]) {
      setCurrentStep(step);
    }
  };

  const handleEmailSubmit = async (submittedEmail: string) => {
    try {
      setIsLoading(true);
      // const response = await authApi.requestResetPass({
      //   email: submittedEmail,
      // });
      const response = true;

      if (response) {
        setEmail(submittedEmail);
        setCurrentStep("code");
        setCanNavigateToStep((prev) => ({ ...prev, code: true }));
        toast.success("Recovery code sent to your email");
      }
    } catch (error) {
      toast.error("Failed to send recovery code");
      console.error("Failed to send recovery code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (code: string) => {
    try {
      setIsLoading(true);
      // const response = await authApi.verifyResetPass({
      //   email,
      //   code,
      // });
      const response = true;

      if (response) {
        setVerificationCode(code); // Save code for final password reset
        setCurrentStep("reset");
        setCanNavigateToStep((prev) => ({ ...prev, reset: true }));
        toast.success("Code verified successfully");
      }
    } catch (error) {
      toast.error("Invalid verification code");
      console.error("Invalid verification code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      // const response = await authApi.requestResetPass({
      //   email,
      // });
      const response = true;

      if (response) {
        toast.success("Recovery code resent to your email");
      }
    } catch (error) {
      toast.error("Failed to resend code");
      console.error("Failed to resend code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (newPassword: string) => {
    try {
      setIsLoading(true);
      // const response = await authApi.resetPassword({
      //   email,
      //   code: verificationCode,
      //   newPassword,
      // });
      const response = true;

      if (response) {
        toast.success("Password reset successfully");
        router.push(RouteNames.SignIn);
      }
    } catch (error) {
      toast.error("Failed to reset password");
      console.error("Failed to reset password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-svh items-center justify-center px-4">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        transition={{ duration: 0.4 }}
      >
        <Card className="min-w-lg flex w-full flex-col items-center p-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-center text-2xl font-semibold"
          >
            Reset Password
          </motion.h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Please enter your email to receive a verification code.
          </p>

          <div className="mb-8 flex w-full justify-between gap-4 px-4 md:gap-20">
            {Object.entries(STEPS).map(([step, index]) => (
              <div
                key={step}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <motion.div
                  animate={{
                    scale: currentStep === step ? 1.1 : 1,
                    opacity: canNavigateToStep[step as ForgotPasswordStep]
                      ? 1
                      : 0.5,
                  }}
                  className={`
                    flex size-12 items-center justify-center rounded-full text-lg font-medium
                    ${
                      currentStep === step
                        ? "bg-primary text-primary-foreground"
                        : canNavigateToStep[step as ForgotPasswordStep]
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }
                    ${
                      canNavigateToStep[step as ForgotPasswordStep]
                        ? "cursor-pointer hover:bg-primary/30"
                        : ""
                    }
                  `}
                  onClick={() => handleStepClick(step as ForgotPasswordStep)}
                >
                  {index + 1}
                </motion.div>
                <span
                  className={`text-center text-sm ${
                    currentStep === step
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {STEP_LABELS[step as ForgotPasswordStep]}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={formTransition}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentStep === "email" && (
                <EmailForm initialEmail={email} onSubmit={handleEmailSubmit} />
              )}
              {currentStep === "code" && (
                <RecoveryCodeForm
                  onSubmit={handleCodeSubmit}
                  onResend={handleResendCode}
                />
              )}
              {currentStep === "reset" && (
                <ResetPasswordForm onSubmit={handlePasswordReset} />
              )}
            </motion.div>
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
