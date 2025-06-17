import { Comment } from "@/components/feature/CommentSystem/type";

export const defaultComments: Comment[] = [
  {
    id: "a5ca6255-5b75-436d-b44e-e90e9040525cb",
    content: "Cám ơn các bạn đã ủng hộ web",
    author: {
      id: "a5ca6255-5b75-436d-b44e-e90e9040525cb",
      name: "Miss.Huyen",
      image: "https://example.com/teacher.jpg",
      role: "teacher",
    },
    likes: 0,
    specialLikes: 1,
    createdAt: "about 3 hours ago",
    hasReplies: true,
    userReaction: null,
    reactions: [
      {
        id: "e42e0e00-200c-4a26-b827-e4a8bbf9a940",
        userId: "ddcbe856-dc3b-43f3-a5a6-ab4c4b21f848",
        type: "teacher_heart",
        createdAt: "2025-05-17T05:34:40.580Z",
      },
    ],
  },
  {
    id: "a5ca6255-5b75-436d-b44e-e90e904055cb",
    content: "Bài viết này rất hữu ích, cảm ơn tác giả!",
    author: {
      id: "a5ca6255-5b75-436d-b44e-e90e904055cb",
      name: "Thùy Thúy",
      image: "https://example.com/student1.jpg",
      role: "student",
    },
    likes: 1,
    specialLikes: 0,
    createdAt: "about 3 hours ago",
    hasReplies: false,
    userReaction: null,
    reactions: [
      {
        id: "e42e0e00-200c-4a26-b827-e4a8bbf9a940",
        userId: "ddcbe856-dc3b-43f3-a5a6-ab4c4b21f848",
        type: "like",
        createdAt: "2025-05-17T05:34:40.580Z",
      },
    ],
  },
  {
    id: "a5ca6255-5b75-436d-b44e-e90e90240552b",
    content:
      "Bắt đầu dùng web này từ 2 tháng trước khi điểm writing chỉ có 5.0, nhận được kết quả 2 ngày rồi mà vẫn chưa tin bản thân đạt 7.0 writing, cảm ơn web nhiều lắm ạ. Nhất định sẽ giới thiệu web với bạn bè ạ <3",
    author: {
      id: "a5ca6255-5b75-436d-b44e-e90e90240552b",
      name: "Jacky",
      image: "https://example.com/student1.jpg",
      role: "student",
    },
    likes: 1,
    specialLikes: 0,
    createdAt: "about 1 hours ago",
    hasReplies: false,
    userReaction: null,
    reactions: [
      {
        id: "e42e0e00-200c-4a26-b827-e4a8bbf9a940",
        userId: "ddcbe856-dc3b-43f3-a5a6-ab4c4b21f848",
        type: "like",
        createdAt: "2025-05-17T05:34:40.580Z",
      },
    ],
  },
  {
    id: "a5ca6255-5b75-436d-b44e-e90e29040552b",
    content: "em cảm ơn thầy cô ạ",
    author: {
      id: "a5ca6255-5b75-436d-b44e-e90e29040552b",
      name: "Trang",
      image: "https://example.com/student1.jpg",
      role: "student",
    },
    likes: 1,
    specialLikes: 0,
    createdAt: "about 2 hours ago",
    hasReplies: false,
    userReaction: null,
    reactions: [
      {
        id: "e42e0e00-200c-4a26-b827-e4a8bbf9a940",
        userId: "ddcbe856-dc3b-43f3-a5a6-ab4c4b21f848",
        type: "like",
        createdAt: "2025-05-17T05:34:40.580Z",
      },
    ],
  },
];
