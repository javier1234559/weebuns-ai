import React from "react";
import { TeacherProfileEntity } from "@/services/swagger-types";

interface AboutTabProps {
  teacherProfile: TeacherProfileEntity;
}

export const AboutTab: React.FC<AboutTabProps> = ({ teacherProfile }) => {
  const certifications = teacherProfile.certifications?.split(",") || [];

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold text-foreground">About</h2>
      <p className="mb-8 leading-relaxed text-muted-foreground">
        {teacherProfile.longBio || "No biography available"}
      </p>

      <h3 className="mb-3 text-lg font-semibold text-foreground">
        Intro Video
      </h3>
      <div className="mb-8 flex h-72 w-full items-center justify-center rounded-lg bg-muted md:h-96">
        {teacherProfile.introVideoUrlEmbed ? (
          <iframe
            src={teacherProfile.introVideoUrlEmbed}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="text-muted-foreground">No intro video available</p>
        )}
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">
        Teaching Experience
      </h3>
      <p className="mb-8 text-muted-foreground">
        {teacherProfile.teachingExperience || "No teaching experience information available"}
      </p>

      <h3 className="mb-3 text-lg font-semibold text-foreground">
        Specializations
      </h3>
      <p className="mb-8 text-muted-foreground">
        {teacherProfile.other || "No specializations information available"}
      </p>

      <h3 className="mb-3 text-lg font-semibold text-foreground">
        Certifications
      </h3>
      <ul className="list-inside list-disc space-y-2 text-muted-foreground">
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <li key={index}>{cert.trim()}</li>
          ))
        ) : (
          <li>No certifications available</li>
        )}
      </ul>
    </div>
  );
};
