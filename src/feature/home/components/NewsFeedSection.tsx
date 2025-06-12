"use client";

import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import Link from "next/link";
import NotificationView from "@/feature/notification/views/NotificationView";
import { useBanners } from "@/feature/banner/useBanner";
import { Skeleton } from "@/components/ui/skeleton";

const NewsFeedSection = () => {
  const { data: banners, isLoading } = useBanners();

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 md:!flex-row">
        <Skeleton className="h-[308px] w-full" />
        <Skeleton className="h-[308px] w-full" />
      </div>
    );
  }

  return (
    <div className="sha flex w-full flex-col gap-6 md:!flex-row">
      {/* Carousel */}
      <div className="w-full shadow-2xl md:w-2/3">
        <Splide
          className="relative overflow-hidden rounded-lg"
          options={{
            type: "loop",
            perPage: 1,
            autoplay: true,
            pauseOnHover: true,
            interval: 5000,
            height: "auto",
          }}
        >
          {banners?.data.map((item, index) => (
            <SplideSlide key={index}>
              <Link href={item.actionLink}>
                <div className="relative aspect-[795/308] w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className="rounded-lg object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <NotificationView />
    </div>
  );
};

export default NewsFeedSection;
