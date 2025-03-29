import { Lesson } from "@/feature/lesson/lesson.type";

export const detailListening: Lesson = {
  id: "1",
  skill: "listening",
  skill_type: "academic",
  title: "IELTS Listening Task 3: Text Completion Masterclass",
  image_url: "/images/lessons/thumbnail.png",
  description:
    "Learn how to write a well-structured opinion essay for IELTS Writing Task 2. Master argument development, paragraph organization, and advanced vocabulary usage.",
  lesson_type: "Tutorial",
  level: "intermediate",
  topic: "academic_writing",
  time_limit: 60,
  content: {
    topics: ["Essay structure", "Opinion language", "Common question types"],
    practice: ["Sample essays", "Vocabulary exercises"],
  },
  status: "published",
  created_by: "67890-user-id",
  created_at: new Date("2024-02-15"),
  updated_at: new Date("2024-02-15"),
};

export const sampleListening = {
  title: "The History of Coffee",
  description: "Read the passage and answer the questions that follow.",
  audio_url:
    "https://utfs.io/f/fkClDhMQd7TEFE6MyrNOBZVRtYmaGTokEgPSMuA5U2jxqwiW",
  questions: [
    {
      id: "q1",
      question: "Where did coffee originate?",
      options: ["Yemen", "Ethiopia", "Turkey", "Brazil"],
      answer: "Ethiopia",
    },
    {
      id: "q2",
      question: "Who is credited with discovering coffee according to legend?",
      options: [
        "A Turkish merchant",
        "An Arabian trader",
        "Kaldi the goatherder",
        "Francisco de Mello Palheta",
      ],
      answer: "Kaldi the goatherder",
    },
    {
      id: "q3",
      question: "When did coffee cultivation begin in Brazil?",
      options: [
        "In the 9th century",
        "In 1714",
        "In 1727",
        "In the 17th century",
      ],
      answer: "In 1727",
    },
    {
      id: "q4",
      question: "How was coffee initially received in Europe?",
      options: [
        "With immediate acceptance",
        "With suspicion and fear by some",
        "As a luxury item only",
        "As a medical treatment",
      ],
      answer: "With suspicion and fear by some",
    },
    {
      id: "q5",
      question: "Which region first cultivated and traded coffee commercially?",
      options: [
        "Ethiopian highlands",
        "European continent",
        "Arabian Peninsula",
        "South America",
      ],
      answer: "Arabian Peninsula",
    },
  ],
};
