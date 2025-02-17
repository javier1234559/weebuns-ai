"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

type FluidTabsProps = {
  tabs: TabItem[];
};

export default function FluidTabs({ tabs }: FluidTabsProps) {
  const pathname = usePathname();
  const [touchedTab, setTouchedTab] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeTab = tabs.find((tab) => tab.href === pathname)?.id || tabs[0].id;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setPrevPath(pathname);
    setTouchedTab(tabId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setTouchedTab(null);
    }, 300);
  };

  const getTabIndex = (tabId: string) =>
    tabs.findIndex((tab) => tab.id === tabId);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative flex w-full space-x-1 rounded-full bg-muted/50 p-1">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className="absolute inset-y-0 my-0.5 rounded-full bg-accent/20 shadow-sm"
            initial={{
              x: `${getTabIndex(tabs.find((tab) => tab.href === prevPath)?.id || tabs[0].id) * 100}%`,
            }}
            animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${100 / tabs.length}%` }}
          />
        </AnimatePresence>
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`
              relative z-10 flex w-full items-center justify-center gap-1
              rounded-full px-1.5 py-1.5 text-sm font-medium
              transition-all duration-300
              ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }
              ${touchedTab === tab.id ? "blur-sm" : ""}
            `}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
