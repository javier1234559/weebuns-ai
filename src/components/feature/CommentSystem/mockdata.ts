export const mockComments = [
  {
    id: "1",
    content:
      "This is a great article! Really helped me understand the topic better.",
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
      isAuthor: true,
    },
    likes: 15,
    specialLikes: 3,
    createdAt: "2024-02-20T10:00:00.000Z",
    replies: [
      {
        id: "1-1",
        content:
          "Glad you found it helpful! Let me know if you have any questions.",
        author: {
          name: "Jane Smith",
          image: "https://github.com/shadcn.png",
        },
        likes: 8,
        specialLikes: 0,
        createdAt: "2024-02-20T10:30:00.000Z",
        replies: [
          {
            id: "1-1-1",
            content: "I actually have a question about the second part...",
            author: {
              name: "Mike Johnson",
              image: "https://github.com/shadcn.png",
            },
            likes: 3,
            specialLikes: 0,
            createdAt: "2024-02-20T11:00:00.000Z",
            replyTo: "Jane Smith",
          },
        ],
      },
      {
        id: "1-2",
        content: "Could you make a follow-up article on advanced topics?",
        author: {
          name: "Sarah Wilson",
          image: "https://github.com/shadcn.png",
        },
        likes: 5,
        specialLikes: 0,
        createdAt: "2024-02-20T12:00:00.000Z",
      },
    ],
  },
  {
    id: "2",
    content: "I've been using this technique for a while, it works great!",
    author: {
      name: "Alex Brown",
      image: "https://github.com/shadcn.png",
    },
    likes: 12,
    specialLikes: 0,
    createdAt: "2024-02-19T15:00:00.000Z",
    replies: [
      {
        id: "2-1",
        content: "Do you have any tips for beginners?",
        author: {
          name: "Chris Lee",
          image: "https://github.com/shadcn.png",
        },
        likes: 4,
        specialLikes: 0,
        createdAt: "2024-02-19T16:00:00.000Z",
      },
    ],
  },
  {
    id: "3",
    content: "Nice explanation! Very clear and concise.",
    author: {
      name: "Emma Davis",
      image: "https://github.com/shadcn.png",
    },
    likes: 9,
    specialLikes: 0,
    createdAt: "2024-02-18T09:00:00.000Z",
  },
];
