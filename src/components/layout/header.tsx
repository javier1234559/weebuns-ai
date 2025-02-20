"use client";

import { useState } from "react";
import FluidTabs from "@/components/animata/card/fluid-tabs";
import AppLink from "@/components/common/app-link";
import ThemeToggle from "@/components/feature/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import useScroll from "@/hooks/useScroll";
import {
  BookOpenIcon,
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScroll({ threshold: 10 });

  const tabs = [
    {
      id: "home",
      label: "Trang chủ",
      icon: <HomeIcon className="size-4" />,
      href: "/home",
    },
    {
      id: "lesson",
      label: "Bài học",
      icon: <GraduationCapIcon className="size-4" />,
      href: "/lesson",
    },
    {
      id: "blog",
      label: "Kiến thức",
      icon: <NewspaperIcon className="size-4" />,
      href: "/blog",
    },
    {
      id: "about",
      label: "Giới thiệu",
      icon: <InfoIcon className="size-4" />,
      href: "/about",
    },
    {
      id: "my-vocabulary",
      label: "Sổ từ vựng",
      icon: <BookmarkIcon className="size-4" />,
      href: "/my-vocabulary",
    },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full bg-transparent backdrop-blur-md shadow-sm transition-all duration-500 ${
        isScrolled ? "bg-background/90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <nav className="flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="shrink-0">
            <AppLink
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <PawPrint className="size-8 text-primary" />
              <span className="bg-primary from-primary to-primary-foreground bg-clip-text text-2xl font-bold text-transparent">
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
            <Link href={RouteNames.SignUp}>
              <Button>Sign Up</Button>
            </Link>
            <Link href={RouteNames.SignIn}>
              <Button variant="outline" className="transition-colors">
                Sign In
              </Button>
            </Link>
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
              <div className="fixed inset-0 z-50 lg:hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Content */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="absolute top-0 w-full bg-background p-4 shadow-lg"
                >
                  <div className="flex flex-col space-y-4">
                    {/* Logo in Mobile Menu */}
                    <div className="mb-4">
                      <AppLink
                        href="/"
                        className="flex items-center gap-2 transition-opacity hover:opacity-80"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <PawPrint className="size-8 text-primary" />
                        <span className="bg-primary from-primary to-primary-foreground bg-clip-text text-2xl font-bold text-transparent">
                          Weebuns AI
                        </span>
                      </AppLink>
                    </div>

                    {tabs.map((tab) => (
                      <Link
                        key={tab.id}
                        href={tab.href}
                        className="group flex items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-accent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-muted-foreground transition-colors group-hover:text-secondary"
                        >
                          {tab.icon}
                        </motion.div>
                        <span className="font-medium text-muted-foreground transition-colors group-hover:text-secondary">
                          {tab.label}
                        </span>
                      </Link>
                    ))}
                    <div className="flex flex-col gap-2 border-t pt-4">
                      <ThemeToggle />
                      <Link href={RouteNames.SignUp}>
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                      <Link href={RouteNames.SignIn}>
                        <Button
                          variant="outline"
                          className="w-full hover:bg-secondary/50"
                          style={{ transition: "none" }}
                        >
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Header;
