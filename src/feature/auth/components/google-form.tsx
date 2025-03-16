import {
  CodeResponse,
  CredentialResponse,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { toast } from "sonner";

import AppIcon from "@/components/common/app-icon";

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
  async function handleLoginByApiRoute(credential: string) {
    if (!credential) throw new Error("No credential provided");

    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  const handleGoogleResponse = async (
    response: CredentialResponse | TokenResponse | CodeResponse,
  ) => {
    if ("access_token" in response) {
      try {
        const result = await handleLoginByApiRoute(response.access_token);
        onSubmit(result);
      } catch (error) {
        toast.error("Login failed. Please try again.");
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
