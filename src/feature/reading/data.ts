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
  <article>
  <h1>The Biggest Crypto Hack in History</h1>
  <p>On the night of <strong>February 21, 2025</strong>, major news outlets reported that <strong>Bybit</strong> – one of the three largest crypto exchanges in the world – was attacked, with over <strong>1.5 billion USD</strong> withdrawn from the exchange. This is considered the biggest hack in crypto market history, with damages more than twice the 600 million USD hack of Poly Network.</p>

  <h2>Unusual Signs at Bybit</h2>
  <p>It all started at <strong>22:20 (Vietnam time)</strong> when ZachXBT posted a warning on Telegram about unusual activities at Bybit. He noted that a large amount of assets was being rapidly withdrawn from the exchange. Specifically, more than <strong>401,346 ETH</strong>, equivalent to <strong>1.1 billion USD</strong>, along with several liquid staking tokens such as <em>stETH, mETH...</em> were transferred out of the platform.</p>

  <p>Currently, the attacker has successfully sold over <strong>200 million USD</strong> worth of stETH tokens.</p>

  <h2>Confirmation from Bybit's CEO</h2>
  <p>About 20 minutes after ZachXBT's warning, <strong>Ben Zhou</strong> – CEO of Bybit, confirmed that the exchange had been attacked. He revealed that the attacker had spoofed the software interface to trick the transaction signing team, thereby altering the smart contract logic of the cold wallet.</p>

  <blockquote>
    “The hacker gained control of the exchange's ETH cold wallet and transferred all assets to unknown addresses,” Ben Zhou admitted.
  </blockquote>

  <p>According to 0xCygaar – an engineer at Abstract, the malicious code that attacked Bybit had been “incubating” in the internal system for a long time, indicating that the hacker group had been planning the attack on this top exchange for an extended period.</p>

  <h2>Will Bybit Become the Next FTX?</h2>
  <p>Following incidents like Bybit's, users often panic and massively withdraw funds from the exchange, leading to a <strong>bank run</strong> – a phenomenon where a large number of customers withdraw money, leaving the platform unable to provide enough liquidity. FTX, WazirX, XT.com… previously experienced bank runs after crises and collapsed within just a few days.</p>

  <p>Bybit was no exception. The exchange recorded over <strong>350,000 withdrawal requests</strong> just one hour after the attack.</p>

  <p><strong>Changpeng Zhao</strong> – former CEO of Binance, suggested that Bybit temporarily halt all withdrawal activities to minimize losses. However, despite the severity of the incident, Ben Zhou continued to allow users to withdraw funds, implicitly affirming that customer assets were still secured and the exchange had sufficient liquidity to pay out in full.</p>
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
