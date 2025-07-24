import { chatUser } from "./chatUser";

export type ChatMessageProps = {
    user: chatUser;
    children: React.ReactNode;
    isOwn?: boolean;
    onReply?: (messageId: string) => void;
    id: string;
    replyTo?: {
      user: chatUser;
      content: React.ReactNode;
    };
  };