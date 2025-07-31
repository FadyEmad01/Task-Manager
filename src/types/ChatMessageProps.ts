import { chatUser } from "./chatUser";

export type ChatMessageProps = {
  user: chatUser;
  children: React.ReactNode;
  isOwn?: boolean;
  onReply?: (messageId: string) => void;
  onEdit?: (messageId: string) => void; // New prop for editing
  onDelete?: (messageId: string) => void; // New prop for deleting
  id: string;
  replyTo?: {
    user: chatUser;
    content: React.ReactNode;
  };
  isEditing?: boolean; // New prop to indicate if the message is currently being edited
};