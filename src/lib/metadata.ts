import type { Metadata } from "next";

const configData = {
  title: "Weebuns",
  description:
    "Luyện IELTS Writing với AI theo phương pháp Logical Framework của Weebuns.",
  keywords: ["IELTS", "Writing", "Practice", "Weebuns", "Logical Framework"],
  author: "Weebuns",
};

export interface MetadataConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
}

export default function generateMetadataDefault({
  title,
  description,
  keywords,
  author,
}: MetadataConfig = {}): Metadata {
  return {
    title: title ? `${configData.title} - ${title}` : configData.title,
    description: description || configData.description,
    keywords: [...configData.keywords, ...(keywords || [])],
    authors: {
      name: author || configData.author,
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ),
    openGraph: {
      title: title ? `${configData.title} - ${title}` : configData.title,
      description: description || configData.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${configData.title} - ${title}` : configData.title,
      description: description || configData.description,
    },
  };
}
