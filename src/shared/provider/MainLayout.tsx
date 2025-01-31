"use client";

import { ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "@/shared/components/layout/theme-provider";
import Footer from "@/shared/components/layout/footer";
import Header from "@/shared/components/layout/header";
import { Toaster } from 'react-hot-toast'

interface Props {
  children: ReactNode;
}

function MainProviders({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>     
      <Toaster />
      <ProgressBar
        height="4px"
        color="#CFE1E2"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Footer />
    </div>
  );
}

export default MainProviders;
