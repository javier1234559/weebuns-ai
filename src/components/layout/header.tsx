"use client";

import { useState, useRef } from "react";
import FluidTabs from "@/components/animata/card/fluid-tabs";
import AppLink from "@/components/common/app-link";
import ThemeToggle from "@/components/feature/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import useScroll from "@/hooks/useScroll";
import {
  HomeIcon,
  GraduationCapIcon,
  NewspaperIcon,
  InfoIcon,
  BookmarkIcon,
  PawPrint,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AvatarMenu from "@/feature/auth/components/AvatarMenu";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAuthStore } from "@/store/auth-store";
import UserBalance from "@/feature/token/components/UserBlance";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScroll({ threshold: 10 });
  const user = useAuthStore((state) => state.user);

  useClickOutside(menuRef, () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  const tabs = [
    {
      id: "home",
      label: "Trang chủ",
      icon: <HomeIcon className="size-4" />,
      href: RouteNames.Home,
    },
    {
      id: "lesson",
      label: "Bài học",
      icon: <GraduationCapIcon className="size-4" />,
      href: RouteNames.Lesson,
    },
    {
      id: "blog",
      label: "Kiến thức",
      icon: <NewspaperIcon className="size-4" />,
      href: RouteNames.Blog,
    },
    {
      id: "about",
      label: "Giới thiệu",
      icon: <InfoIcon className="size-4" />,
      href: RouteNames.About,
    },
    {
      id: "my-vocabulary",
      label: "Sổ từ vựng",
      icon: <BookmarkIcon className="size-4" />,
      href: RouteNames.MyVocabulary,
    },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[20] w-full bg-transparent backdrop-blur-lg shadow-sm transition-all duration-500 ${
        isScrolled ? "bg-background/90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <nav className="flex h-20 items-center justify-between px-4 lg:px-8">
          <div className="shrink-0">
            <AppLink
              href={RouteNames.Landing}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <PawPrint className="size-8" />
              <span className="text-2xl font-bold font-space-grotesk">
                Weebuns AI
              </span>
            </AppLink>
          </div>

          {/* Desktop Menu */}
          <div className="mx-auto hidden max-w-xl flex-1 justify-center px-4 lg:flex">
            <FluidTabs tabs={tabs} />
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            {user ? (
              <>
                <UserBalance />
                <AvatarMenu
                  src="/default-avatar.png"
                  fallback="U"
                  className="h-8 w-8"
                />
              </>
            ) : (
              <>
                <Link href={RouteNames.SignUp}>
                  <Button>Sign Up</Button>
                </Link>
                <Link href={RouteNames.SignIn}>
                  <Button variant="outline" className="transition-colors">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed bg-background/80 backdrop-blur-sm h-screen w-full top-0 right-0 z-[99]"
                  onClick={() => setIsMenuOpen(false)}
                />

                <motion.div
                  ref={menuRef}
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 200,
                  }}
                  className="fixed left-0 top-0 h-screen w-[300px] overflow-y-auto bg-background/95 backdrop-blur-md border-r shadow-2xl z-[100]"
                >
                  <div className="flex flex-col space-y-4 p-6">
                    {/* Logo in Mobile Menu */}
                    <div className="mb-6">
                      <AppLink
                        href={RouteNames.Landing}
                        className="flex items-center gap-2 transition-opacity hover:opacity-80"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <PawPrint className="size-8" />
                        <span className="text-2xl font-bold font-space-grotesk">
                          Weebuns AI
                        </span>
                      </AppLink>
                    </div>

                    {tabs.map((tab) => (
                      <Link
                        key={tab.id}
                        href={tab.href}
                        className="group flex items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-accent/50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-muted-foreground transition-colors group-hover:text-primary"
                        >
                          {tab.icon}
                        </motion.div>
                        <span className="font-medium text-muted-foreground transition-colors group-hover:text-primary">
                          {tab.label}
                        </span>
                      </Link>
                    ))}
                    <div className="flex flex-col gap-3 border-t pt-6">
                      <ThemeToggle />
                      {user ? (
                        <div className="flex items-center gap-4">
                          <UserBalance />
                          <AvatarMenu
                            src="/default-avatar.png"
                            fallback="U"
                            className="h-8 w-8"
                          />
                        </div>
                      ) : (
                        <>
                          <Link href={RouteNames.SignUp}>
                            <Button className="w-full">Sign Up</Button>
                          </Link>
                          <Link href={RouteNames.SignIn}>
                            <Button
                              variant="outline"
                              className="w-full hover:bg-secondary/50"
                            >
                              Sign In
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Header;
