import {
  CodeResponse,
  CredentialResponse,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { toast } from "sonner";

import AppIcon from "@/components/common/app-icon";
import authApi from "@/feature/auth/services/authApi";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          cancel: () => void;
        };
      };
    };
  }
}

interface GoogleFormProps {
  onSubmit: (data: any) => void;
}

function GoogleForm({ onSubmit }: GoogleFormProps) {
  const handleGoogleResponse = async (
    response: CredentialResponse | TokenResponse | CodeResponse,
  ) => {
    if ("access_token" in response) {
      try {
        const result = await authApi.loginGoogle(response.access_token);

        console.log(result);
        onSubmit(result);
      } catch (error) {
        console.error("Google One Tap login failed:", error);
      }
    } else {
      console.error("Google One Tap login failed:", response);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleError = () => {
    toast.error("Failed to retrieve access token from Google", {
      icon: "🤕",
    });
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: handleError,
    flow: "implicit",
  });

  // useGoogleOneTapLogin({
  //   onSuccess: handleGoogleResponse,
  //   onError: handleError,
  //   useOneTap: true,
  //   promptMomentNotification: undefined
  // })

  return (
    <button
      className="flex size-10 w-full items-center justify-center gap-2 rounded-lg border text-foreground transition-all duration-200 hover:scale-[1.02] hover:bg-background"
      onClick={() => login()}
    >
      <AppIcon icon="google" size={20} />
      Login with Google
    </button>
  );
}

export default GoogleForm;
