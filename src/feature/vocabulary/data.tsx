import { Vocabulary } from "./types/vocabulary";

export const vocabularies: Vocabulary[] = [
  {
    id: "1",
    spaceId: "1",
    term: "Hello",
    meaning: ["Xin chào"],
    exampleSentence: "Hello, how are you?",
    imageUrl:
      "https://images.pexels.com/photos/5889988/pexels-photo-5889988.jpeg?auto=compress&cs=tinysrgb&h=350",
    referenceLink:
      "https://images.pexels.com/photos/5889988/pexels-photo-5889988.jpeg?auto=compress&cs=tinysrgb&h=350",
    referenceName: "Hello",
    tags: ["Greeting", "Common"],
    repetitionLevel: 1,
    nextReview: "2025-01-01",
    createdBy: "1",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    deletedAt: "2025-01-01",
  },
];

export interface VocabData {
  id: number;
  value: string;
  word_class: string;
  meaning: string;
  ipa: string;
  explanation: string;
  collocation: string;
  example: string[];
  parent: {
    id: number;
    value: string;
    meaning: string;
    explanation: string;
    reference?: string;
    created_at: string;
  };
  word_display: string;
  created_at: string;
}

// Sample data for simulation
export const SAMPLE_DATA: VocabData = {
  id: 239132,
  value: "reduce",
  word_class: "verb (transitive verb)",
  meaning: "giảm",
  ipa: "/rɪˈduːs/",
  explanation:
    'Trong đoạn văn, "reduce" được sử dụng để diễn tả mục tiêu của các nhà nghiên cứu là làm giảm các mối nguy cơ từ rác thải không gian.',
  collocation: "reduce something",
  example: [
    "The government is trying to reduce pollution. (Chính phủ đang cố gắng giảm thiểu ô nhiễm.)",
    "We need to reduce our expenses. (Chúng ta cần phải giảm chi tiêu.)",
  ],
  parent: {
    id: 239127,
    value: "Researchers are working to reduce these threats",
    meaning: "Các nhà nghiên cứu đang nỗ lực giảm thiểu những mối đe dọa này",
    explanation:
      "Câu này tóm tắt mục tiêu chính của các nhà nghiên cứu được đề cập trong bài. Họ đang cố gắng tìm ra các giải pháp để giảm bớt những nguy cơ gây ra bởi rác vũ trụ và va chạm trên quỹ đạo. Đây là một vấn đề quan trọng vì số lượng vệ tinh và mảnh vỡ trong không gian đang tăng lên nhanh chóng.",
    reference:
      '"These threats" đề cập đến các mối đe dọa từ vệ tinh, mảnh vỡ tên lửa và mảnh vỡ va chạm được nhắc đến trong phần trước của tiêu đề.',
    created_at: "2024-10-11T10:14:41.607031Z",
  },
  word_display: "reduce",
  created_at: "2024-10-11T10:14:41.607031Z",
};
