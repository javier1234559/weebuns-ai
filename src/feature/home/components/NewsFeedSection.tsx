"use client";

import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import Link from "next/link";
import NotificationView from "@/feature/notification/views/NotificationView";

const NewsFeedSection = () => {
  const carouselItems = [
    {
      title: "Hướng dẫn viết Writing Task 1",
      image:
        "https://cms.youpass.vn/assets/2391ddd1-deb2-451e-b1d1-c2f519badba2?width=1000",
      link: "https://ielts1984.vn/ielts-insights",
    },
    {
      title: "Hướng dẫn viết Reading",
      image:
        "https://cms.youpass.vn/assets/b72096f2-117a-4021-9662-91771c3bb03e?width=1500",
      link: "https://ielts1984.vn/ielts-insights",
    },
  ];

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
          {carouselItems.map((item, index) => (
            <SplideSlide key={index}>
              <Link href={item.link}>
                <div className="relative aspect-[795/308] w-full">
                  <Image
                    src={item.image}
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
