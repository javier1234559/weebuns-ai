import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { cn } from "@/lib/utils";
import { RouteNames } from "@/constraints/route-name";
import ThemeSwitchImage from "./theme-switch-image";

const heroData = {
  title: "Luyện Đề Tiếng Anh 4 Kỹ Năng Cùng AI & Giáo Viên Thật",
  description:
    "Nền tảng học tiếng Anh toàn diện: Luyện Viết, Đọc, Nghe, Nói với công nghệ AI hỗ trợ & hệ thống giáo viên đồng hành. Theo dõi, đánh giá và kết nối với giáo viên yêu thích của bạn.",
  primaryCta: {
    text: "Get Started",
    href: RouteNames.SignIn,
  },
  mockupImage: {
    light: "/images/hero-section/hero-light.png",
    dark: "/images/hero-section/hero-dark.png",
    alt: "UI Components Preview",
  },
};

export function HeroSection() {
  return (
    <section
      className={cn(
        "relative  text-foreground",
        "px-4 py-12 md:py-24 lg:py-32",
        "overflow-hidden",
      )}
    >
      <div className="relative mx-auto flex max-w-screen-xl flex-col gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 text-center md:pt-16 lg:gap-12">
          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
              "bg-clip-text text-transparent",
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
              "leading-[1.4] sm:leading-[1.1]",
              "drop-shadow-sm dark:drop-shadow-[0_0_110px_rgba(255,255,255,0.1)]",
            )}
          >
            {heroData.title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[550px] animate-appear opacity-0 [animation-delay:150ms]",
              "text-base sm:text-lg md:text-xl",
              "text-muted-foreground",
              "font-medium",
            )}
          >
            {heroData.description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex animate-appear flex-wrap justify-center
            gap-4 opacity-0 [animation-delay:300ms]"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-gradient-to-b from-brand to-brand/90 dark:from-brand/90 dark:to-brand/80",
                "hover:from-brand/95 hover:to-brand/85 dark:hover:from-brand/80 dark:hover:to-brand/70",
                "text-white shadow-lg",
                "transition-all duration-300",
              )}
            >
              <a href={heroData.primaryCta.href}>{heroData.primaryCta.text}</a>
            </Button>
          </div>

          {/* Mockup */}
          <div className="relative w-full px-4 pt-12 sm:px-6 lg:px-8">
            <Mockup
              className={cn(
                "animate-appear opacity-0 [animation-delay:700ms]",
                "shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]",
                "border-brand/10 dark:border-brand/5",
              )}
            >
              <ThemeSwitchImage
                lightSrc={heroData.mockupImage.light}
                darkSrc={heroData.mockupImage.dark}
                alt={heroData.mockupImage.alt}
              />
            </Mockup>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
    </section>
  );
}
