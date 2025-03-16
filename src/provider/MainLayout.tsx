"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "next-themes";
import { globalConfig } from "@/config";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AppProgressBar } from "next-nprogress-bar";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function MainProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={globalConfig.GOOGLE_CLIENT_ID}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark"]}
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
            <Toaster />
            <ToasterSonner />
            <AppProgressBar
              height="4px"
              color="hsl(var(--primary))"
              options={{ showSpinner: false }}
              shallowRouting
            />
            <Footer />
          </div>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
