import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Youtube, Linkedin, Twitter } from "lucide-react";
import { UserDto } from "@/services/swagger-types";

interface HeaderSectionProps {
  user: UserDto;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

const socialLinks = [
  { name: "YouTube", icon: <Youtube className="size-6" /> },
  { name: "LinkedIn", icon: <Linkedin className="size-6" /> },
  { name: "Twitter", icon: <Twitter className="size-6" /> },
];

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  user,
  isFollowing,
  onFollowToggle,
}) => {
  return (
    <header className="mb-8 rounded-lg bg-card shadow-sm">
      <div className="flex flex-col items-center p-6">
        <div className="mb-4 flex flex-col items-center">
          <Avatar className="mb-4 size-24 border-2 border-primary md:size-28">
            <Image
              src={user.profilePicture || "/images/auth/building.jpg"}
              alt={`${user.firstName || ""} ${user.lastName || ""}`}
              width={100}
              height={100}
              className="size-full object-cover"
            />
          </Avatar>

          <h1 className="mb-1 text-2xl font-bold text-foreground md:text-3xl">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mb-2 max-w-md text-center text-muted-foreground">
            {user.bio || "No bio available"}
          </p>

          <div className="mt-4 flex space-x-4">
            {socialLinks.map((link, index) => (
              <button
                key={index}
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
