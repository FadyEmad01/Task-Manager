"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { RiChat3Line, RiGroupLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTitle, SheetContent } from "@/components/ui/sheet";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// --- Chat Data Types ---
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

// --- Dummy Chat Data ---
const DUMMY_CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: "chat-1",
    type: "individual",
    participants: [
      { id: "user-1", name: "Alice Wonderland", avatarUrl: "https://i.pravatar.cc/40?img=1" },
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
      { id: "user-4", name: "David Copperfield", avatarUrl: "https://i.pravatar.cc/40?img=2" },
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
      { id: "user-8", name: "Harry Potter", avatarUrl: "https://i.pravatar.cc/40?img=3" },
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

// --- Chat Panel Context ---
type ChatPanelContextType = {
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  togglePanel: () => void;
  // Potentially add state for selected chat ID here if you manage it globally
  // selectedChatId: string | null;
  // setSelectedChatId: (id: string | null) => void;
};

const ChatPanelContext = React.createContext<ChatPanelContextType | null>(
  null,
);

function useChatPanel() {
  const context = React.useContext(ChatPanelContext);
  if (!context) {
    throw new Error(
      "useChatPanel must be used within a ChatPanelProvider.",
    );
  }
  return context;
}

const ChatPanelProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile(1024);
  const [openMobile, setOpenMobile] = React.useState(false);

  // Helper to toggle the sidebar.
  const togglePanel = React.useCallback(() => {
    return isMobile && setOpenMobile((open) => !open);
  }, [isMobile, setOpenMobile]);

  const contextValue = React.useMemo<ChatPanelContextType>(
    () => ({
      isMobile,
      openMobile,
      setOpenMobile,
      togglePanel,
    }),
    [isMobile, openMobile, setOpenMobile, togglePanel],
  );

  return (
    <ChatPanelContext.Provider value={contextValue}>
      {children}
    </ChatPanelContext.Provider>
  );
};
ChatPanelProvider.displayName = "ChatPanelProvider";

// --- Chat Panel Content ---
const ChatPanelContent = () => {
  // In a real application, you'd fetch this data (e.g., via React Query, SWR, or a global store)
  const chatConversations: ChatConversation[] = DUMMY_CHAT_CONVERSATIONS;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today: "HH:MM AM/PM"
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      // Yesterday
      return "Yesterday";
    } else if (diffDays < 7) {
      // Within the last week: "Day of Week"
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // More than a week: "Mon DD"
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <>
      {/* Sidebar header */}
      <div className="py-5">
        <div className="flex items-center gap-2">
          <RiChat3Line
            className="text-muted-foreground/70"
            size={20}
            aria-hidden="true"
          />
          <h2 className="text-sm font-medium">Chats</h2>
        </div>
      </div>

      {/* Chat list - wrapped in ScrollArea for desktop, or implicitly handled by Sheet for mobile */}
      <div className="-mt-px flex flex-col flex-grow"> {/* Use flex-grow to fill available space */}
        <div className="py-5 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
          <h3 className="text-xs font-medium uppercase text-muted-foreground/80 mb-4">
            Conversations
          </h3>
          <div className="space-y-2">
            {chatConversations.length > 0 ? (
              chatConversations.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-2"
                  // TODO: Add an onClick handler here to select the chat
                  // onClick={() => handleChatSelection(chat.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* Avatar for individual chats, or a group icon for groups */}
                    <Avatar className="h-9 w-9">
                      {chat.type === "individual" && chat.participants[0].avatarUrl ? (
                        <AvatarImage src={chat.participants[0].avatarUrl} alt={chat.participants[0].name} />
                      ) : (
                        <AvatarFallback>
                          {chat.type === "individual"
                            ? chat.participants[0].name.charAt(0).toUpperCase()
                            : <RiGroupLine size={18} />} {/* Use RiGroupLine for group fallback */}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm truncate">
                          {chat.type === "individual"
                            ? chat.participants[0].name
                            : chat.name}
                        </p>
                        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                          {formatDate(chat.lastMessage.timestamp)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-05">
                        <p className="text-xs text-muted-foreground truncate">
                          {chat.lastMessage.text}
                        </p>
                        {chat.unreadCount > 0 && (
                          // <Badge className="ml-2 flex-shrink-0 rounded-full h-4 min-w-4 p-0.5 flex items-center justify-center text-xs font-medium ">
                          <Badge className="flex items-center justify-center flex-shrink-0 min-w-4 h-4 px-1 rounded-full tabular-nums font-mono ms-2">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No conversations yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
ChatPanelContent.displayName = "ChatPanelContent";

// --- Chat Panel Component ---
const ChatPanel = () => {
  const { isMobile, openMobile, setOpenMobile } = useChatPanel();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent className="w-72 px-4 md:px-6 py-0 bg-background flex flex-col [&>button]:hidden"> {/* Changed background, added flex-col */}
          <SheetTitle className="hidden">Chat</SheetTitle>
          {/* SheetContent itself will handle the scroll behavior on mobile */}
          <ChatPanelContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <ScrollArea className="h-full"> {/* Ensure ScrollArea has a height */}
      <div className="w-[300px] px-4 md:px-6 flex flex-col h-full"> {/* Added flex-col h-full */}
        <ChatPanelContent />
      </div>
    </ScrollArea>
  );
};
ChatPanel.displayName = "ChatPanel";

// --- Chat Panel Trigger ---
const ChatPanelTrigger = ({
  onClick,
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { isMobile, togglePanel } = useChatPanel();

  if (!isMobile) {
    return null; // Only show trigger on mobile
  }

  return (
    <Button
      variant="ghost"
      className="px-2"
      onClick={(event) => {
        onClick?.(event);
        togglePanel();
      }}
    >
      <RiChat3Line // Changed from Users to RiChat3Line for chat icon
        className="text-muted-foreground sm:text-muted-foreground/70 size-5"
        size={20}
        aria-hidden="true"
      />
      <span className="max-sm:sr-only">Chats</span> {/* Changed text */}
    </Button>
  );
};
ChatPanelTrigger.displayName = "ChatPanelTrigger";

export {
  ChatPanel,
  ChatPanelProvider,
  ChatPanelTrigger,
  useChatPanel,
};