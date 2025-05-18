"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BellRing } from "lucide-react";
import NotificationCard from "./NotificationCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";
import { NotificationType } from "@/types/notification";

const NewsFeedSection = () => {
  const notifications = [
    {
      title: "Bạn đã gửi bài viết để kiểm tra",
      link: "/luyen-thi/ielts/writing/task-1?status=unfinished",
      dateCreated: "2024-05-06T12:17:23.345Z",
      isRead: false,
      type: "submission",
      userData: {
        user_created: "cc6ca7ca-ebd3-492f-a23b-0f5c0bde2098",
        date_updated: "2025-01-17T07:57:47.213Z",
      },
    },
    {
      title: "Luyện Writing AI / Reading / Listening FREE",
      link: "/luyen-thi/ielts/writing/task-1?status=unfinished",
      dateCreated: "2024-05-06T12:17:23.345Z",
      isRead: false,
      type: "advertisement",
      userData: {
        user_created: "cc6ca7ca-ebd3-492f-a23b-0f5c0bde2098",
        date_updated: "2025-01-17T07:57:47.213Z",
      },
    },
    {
      title: "John Doe đã bình luận bài viết của bạn",
      link: "/luyen-thi/ielts/writing/task-1?status=unfinished",
      dateCreated: "2024-05-06T12:17:23.345Z",
      isRead: false,
      type: "comment_reply",
      userData: {
        user_created: "cc6ca7ca-ebd3-492f-a23b-0f5c0bde2098",
        date_updated: "2025-01-17T07:57:47.213Z",
      },
    },
    {
      title: "John Doe đã nhắc đến bạn trong bài viết",
      link: "/luyen-thi/ielts/writing/task-1?status=unfinished",
      dateCreated: "2024-05-06T12:17:23.345Z",
      isRead: false,
      type: "comment_mention",
      userData: {
        user_created: "cc6ca7ca-ebd3-492f-a23b-0f5c0bde2098",
        date_updated: "2025-01-17T07:57:47.213Z",
      },
    },
  ];

  const carouselItems = [
    {
      title: "Hướng dẫn viết Writing Task 1",
      image:
        "https://cms.youpass.vn/assets/2391ddd1-deb2-451e-b1d1-c2f519badba2?width=1000",
      link: "/ielts-writing-task-1-guide",
    },
    {
      title: "Hướng dẫn viết Reading",
      image:
        "https://cms.youpass.vn/assets/2391ddd1-deb2-451e-b1d1-c2f519badba2?width=1000",
      link: "/ielts-reading-guide",
    },
    {
      title: "Hướng dẫn viết Reading",
      image:
        "https://cms.youpass.vn/assets/2391ddd1-deb2-451e-b1d1-c2f519badba2?width=1000",
      link: "/ielts-reading-guide",
    },
  ];

  const handleNotificationClick = (notification: any) => {
    console.log("clicked", notification);
  };

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

      {/* Panel */}
      <Card className="md:aspect-none relative aspect-square w-full sm:aspect-video md:w-1/3">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <BellRing className="size-4 text-gray-500" />
            <h2 className="font-medium">Trung tâm thông báo</h2>
          </div>
          <Button variant="link" className="text-sm text-blue-500">
            Xem tất cả
          </Button>
        </div>
        <CardContent className="thin-scrollbar max-h-[224px] overflow-y-auto rounded-lg p-1">
          <div className="divide-y">
            {notifications.map((notification, index) => (
              <NotificationCard
                key={index}
                {...notification}
                type={notification.type as NotificationType}
                onClick={() => {
                  handleNotificationClick(notification);
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsFeedSection;
