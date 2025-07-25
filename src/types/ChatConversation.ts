export type User = {
    id: string;
    name: string;
    avatarUrl?: string;
};

export type Group = {
    id: string;
    name: string;
    avatarUrl?: string; // Optional: for group avatars, or default to icon
};

export type ChatParticipant = User | Group;

export type LastMessage = {
    text: string;
    timestamp: string; // ISO 8601 string
};

export type ChatConversation = {
    id: string;
    type: "individual" | "group";
    participants: ChatParticipant[];
    name?: string; // Optional for groups, or derived for individuals
    lastMessage: LastMessage;
    unreadCount: number;
};