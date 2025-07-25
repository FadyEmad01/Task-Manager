"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { RiChat3Line, RiGroupLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTitle, SheetContent } from "@/components/ui/sheet";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'; // Import usePathname from next/navigation
import { ChatConversation } from "@/types/ChatConversation";
import { DUMMY_CHAT_CONVERSATIONS } from "@/constants/DUMMY_CHAT_CONVERSATIONS";



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
  const { isMobile, setOpenMobile } = useChatPanel();
  const pathname = usePathname(); // Get the current pathname

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
      <div className="py-5 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
        <h3 className="text-xs font-medium uppercase text-muted-foreground/80 mb-4">
          Conversations
        </h3>
        <div className="flex flex-col gap-y-2">
          {chatConversations.length > 0 ? (
            chatConversations.map((chat) => {
              const chatHref = `/chat/${chat.id}`;
              const isActive = pathname === chatHref; // Determine if the current chat is active

              return (
                <Link
                  key={chat.id}
                  href={chatHref}
                  passHref
                >
                  <Button
                    asChild
                    // Conditionally apply variant based on isActive
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start h-auto p-2"
                    onClick={() => isMobile && setOpenMobile(false)}
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
                              : <RiGroupLine size={18} />}
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
                            <Badge className="flex items-center justify-center flex-shrink-0 min-w-4 h-4 px-1 rounded-full tabular-nums font-mono ms-2">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Button>
                </Link>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No conversations yet.
            </p>
          )}
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
        <SheetContent className="w-72 px-4 md:px-6 py-0 bg-background flex flex-col [&>button]:hidden">
          <SheetTitle className="hidden">Chat</SheetTitle>
          <ChatPanelContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="w-[300px] px-4 md:px-6 flex flex-col h-full">
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
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, togglePanel } = useChatPanel();

  if (!isMobile) return null;

  const isChatPage = pathname.startsWith("/chat");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (!isChatPage) {
      router.push("/chat");
    }

    togglePanel();
  };

  return (
    <Button
      variant="ghost"
      className="px-2"
      onClick={handleClick}
    >
      <RiChat3Line
        className="text-muted-foreground sm:text-muted-foreground/70 size-5"
        size={20}
        aria-hidden="true"
      />
      <span className="max-sm:sr-only">Chats</span>
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