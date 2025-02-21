import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { OtpInput } from "reactjs-otp-input";

interface RecoveryCodeFormProps {
  onSubmit: (code: string) => void;
  onResend: () => void;
}

export function RecoveryCodeForm({
  onSubmit,
  onResend,
}: RecoveryCodeFormProps) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const code = watch("code");

  const handleCodeChange = (value: string) => {
    setValue("code", value);
    if (value.length === 6) {
      clearErrors("code");
    }
    if (value.length < 6) {
      setError("code", {
        type: "validate",
        message: "Please enter a 6-digit code",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.code))}
      className="space-y-6"
    >
      <p className="mb-6 text-sm text-muted-foreground">
        We&apos;ve sent a recovery code to your email. Please enter it below.
      </p>

      <div className="mb-6 flex justify-center">
        <div>
          <OtpInput
            value={code}
            onChange={handleCodeChange}
            numInputs={6}
            separator={<span className="mx-2">-</span>}
            containerStyle="flex gap-2"
            inputStyle={{
              width: "40px",
              height: "40px",
              padding: "0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
            focusStyle={{
              border: "2px solid var(--primary)",
              outline: "none",
            }}
            errorStyle={{
              border: "2px solid var(--destructive)",
            }}
            shouldAutoFocus
          />
          {errors.code && (
            <p className="mt-2 text-center text-sm text-destructive">
              {errors.code.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Button type="submit" className="w-full">
          Verify Code
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onResend}
          className="w-full"
        >
          Resend Code
        </Button>
      </div>
    </form>
  );
}
