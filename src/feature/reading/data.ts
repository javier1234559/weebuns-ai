import { Lesson } from "@/feature/lesson/types/lesson";

export const detailReading: Lesson = {
  id: "1",
  skill: "reading",
  skill_type: "academic",
  title: "IELTS Reading Task 3: Text Completion Masterclass",
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

export const sampleReading = {
  title: "The History of Coffee",
  description: "Read the passage and answer the questions that follow.",
  content: `
    <article class="prose prose-sm lg:prose-base">
      <h2>The Discovery of Coffee</h2>

      <p>The story of coffee began in Ethiopia, the original home of the coffee plant, coffee arabica, which still grows wild in the forest of the highlands. Coffee cultivation and drinking began early in the 9th century. According to legend, the 9th-century Ethiopian goatherder Kaldi discovered coffee when he noticed how excited his goats became after eating beans from a coffee plant.</p>

      <h3>Spread to the Arabian Peninsula</h3>

      <p>Coffee cultivation and trade began on the Arabian Peninsula. By the 15th century, coffee was being grown in Yemen's Yemeni region, and by the 16th century, it was known in Persia, Egypt, Syria, and Turkey. Coffee was not only enjoyed in homes but also in the many public coffee houses which began to appear in cities across the Near East.</p>

      <h3>European Popularity</h3>

      <p>European travelers to the Near East brought back stories of an unusual dark black beverage. By the 17th century, coffee had made its way to Europe and was becoming popular across the continent. Some people reacted to this new beverage with suspicion or fear, calling it the "bitter invention of Satan."</p>

      <h3>Coffee in the Americas</h3>

      <p>In 1714, the King of France received a young coffee plant as a gift. This plant was the parent of the coffee trees that would later be grown in the Caribbean, South and Central America. Brazil, which became the world's largest coffee producer, got its start when Francisco de Mello Palheta planted the first coffee tree in 1727.</p>

        <h3>Spread to the Arabian Peninsula</h3>

      <p>Coffee cultivation and trade began on the Arabian Peninsula. By the 15th century, coffee was being grown in Yemen's Yemeni region, and by the 16th century, it was known in Persia, Egypt, Syria, and Turkey. Coffee was not only enjoyed in homes but also in the many public coffee houses which began to appear in cities across the Near East.</p>

      <h3>European Popularity</h3>

      <p>European travelers to the Near East brought back stories of an unusual dark black beverage. By the 17th century, coffee had made its way to Europe and was becoming popular across the continent. Some people reacted to this new beverage with suspicion or fear, calling it the "bitter invention of Satan."</p>

      <h3>Coffee in the Americas</h3>
    </article>
  `,
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
