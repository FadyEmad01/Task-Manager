import { ChatConversation } from "@/types/ChatConversation";

export const DUMMY_CHAT_CONVERSATIONS: ChatConversation[] = [
    {
      id: "chat-1",
      type: "individual",
      participants: [
        { id: "user-1", name: "Alice Wonderland", avatarUrl: "https://i.pravatar.cc/40?img=1(https://i.pravatar.cc/40?img=1)" },
      ],
      lastMessage: { text: "Hey, how are you doing today?", timestamp: "2025-07-24T16:55:00Z" },
      unreadCount: 2,
    },
    {
      id: "chat-2",
      type: "group",
      name: "Team Project X",
      participants: [
        { id: "user-2", name: "Bob The Builder" },
        { id: "user-3", name: "Charlie Chaplin" },
      ],
      lastMessage: { text: "Let's finalize the presentation slides.", timestamp: "2025-07-24T15:30:00Z" },
      unreadCount: 0,
    },
    {
      id: "chat-3",
      type: "individual",
      participants: [
        { id: "user-4", name: "David Copperfield", avatarUrl: "https://i.pravatar.cc/40?img=2(https://i.pravatar.cc/40?img=2)" },
      ],
      lastMessage: { text: "Can you send me the latest report by tomorrow?", timestamp: "2025-07-23T18:00:00Z" },
      unreadCount: 1,
    },
    {
      id: "chat-4",
      type: "group",
      name: "Dev Team Standup",
      participants: [
        { id: "user-5", name: "Eve Harrington" },
        { id: "user-6", name: "Frank Sinatra" },
        { id: "user-7", name: "Grace Kelly" },
      ],
      lastMessage: { text: "Don't forget the daily standup at 9 AM.", timestamp: "2025-07-22T09:15:00Z" },
      unreadCount: 5,
    },
    {
      id: "chat-5",
      type: "individual",
      participants: [
        { id: "user-8", name: "Harry Potter", avatarUrl: "https://i.pravatar.cc/40?img=3(https://i.pravatar.cc/40?img=3)" },
      ],
      lastMessage: { text: "Thanks for your help with the bug!", timestamp: "2025-07-21T11:00:00Z" },
      unreadCount: 0,
    },
    {
      id: "chat-6",
      type: "group",
      name: "Marketing Brainstorm",
      participants: [
        { id: "user-9", name: "Ivy League" },
        { id: "user-10", name: "Jack Sparrow" },
      ],
      lastMessage: { text: "New campaign ideas are in the shared document.", timestamp: "2025-07-20T14:00:00Z" },
      unreadCount: 3,
    },
  ];