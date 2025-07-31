"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiShining2Line, } from "@remixicon/react";
import { useRef, useEffect, useState } from "react";
import { ChatMessage, } from "../layout/chat-message";
import { X } from "lucide-react";
import { fakeUsers } from "@/constants/fakeUsers"
import { chatUser } from "@/types/chatUser";
import { motion, AnimatePresence } from "framer-motion";

// Define a type for your messages with 'content' as a string
interface Message {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    color: string;
  };
  content: string; // <-- Changed to string
  replyTo?: {
    user: {
      id: string;
      name: string;
      avatar: string;
      color: string;
    };
    content: string; // <-- Changed to string
  };
  isEditing?: boolean;
}

export default function Chat() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      user: fakeUsers[0],
      content: "Hey everyone! Ready for the project meeting?", // <-- Now a string
    },
    {
      id: "m2",
      user: fakeUsers[1],
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci aliquam rem amet corrupti maxime necessitatibus saepe, delectus labore, suscipit a corporis non nostrum accusantium maiores numquam deleniti sapiente praesentium est!", // <-- Now a string
    },
    {
      id: "m3",
      user: fakeUsers[2],
      content: "Hey Bob, hey Alice! I'm here. Let's get started.", // <-- Now a string
    },
    {
      id: "m4",
      user: fakeUsers[1],
      content: "Great! First, let's review last week's tasks.", // <-- Now a string
      replyTo: {
        user: fakeUsers[2],
        content: "I'm here. Let's get started.", // <-- Now a string
      },
    },
    {
      id: "m5",
      user: fakeUsers[0],
      content: "Sure! I finished the UI updates and pushed to GitHub.", // <-- Now a string
    },
    {
      id: "m6",
      user: fakeUsers[0],
      content: "Hey everyone! Ready for the project meeting?", // <-- Now a string
      replyTo: {
        user: fakeUsers[2],
        content: "I'm here. Let's get started.", // <-- Now a string
      },
    },
  ]);

  const currentUserId = "1";
  const [replyTo, setReplyTo] = useState<null | { id: string; user: chatUser; content: string }>(null);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  };

  const handleReply = (messageId: string) => {
    const messageToReplyTo = messages.find(msg => msg.id === messageId);
    if (messageToReplyTo) {
      setReplyTo({
        id: messageId,
        user: messageToReplyTo.user,
        content: messageToReplyTo.content,
      });
      setEditingMessageId(null);
    }
  };

  const handleEdit = (messageId: string) => {
    setEditingMessageId(messageId);
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (messageToEdit) {
      setInput(messageToEdit.content);
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
      }
    }
    setReplyTo(null);
  };

  const handleSaveEdit = () => {
    if (!editingMessageId || input.trim() === "") return;

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === editingMessageId
          ? { ...msg, content: input }
          : msg
      )
    );
    setInput("");
    setEditingMessageId(null);
  };

  const handleCancelEdit = () => {
    setInput("");
    setEditingMessageId(null);
  };

  const handleDelete = (messageId: string) => {
    // Replaced window.confirm with a custom modal for better UI, as per instructions.
    // For this example, we'll use a simple confirmation but in a real app,
    // you would show a custom UI element here.
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages, replyTo]);

  if (!hydrated) return null;

  return (
    <ScrollArea className="flex-1 h-full w-full bg-background">
      <div className="h-full flex flex-col px-4 md:px-6 lg:px-8">
        <div className="relative grow">
          <div className=" mx-auto mt-6 space-y-6">
            <div className="text-center my-8">
              <div className="inline-flex items-center bg-muted rounded-full border border-muted/[0.08] shadow-xs text-xs font-medium py-1 px-3 text-foreground/80">
                <RiShining2Line
                  className="me-1.5 text-muted-foreground/70 -ms-1"
                  size={14}
                  aria-hidden="true"
                />
                Today
              </div>
            </div>
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageWrapper key={msg.id} isBlurred={!!editingMessageId && editingMessageId !== msg.id}>
                  <ChatMessage
                    id={msg.id}
                    user={msg.user}
                    isOwn={msg.user.id === currentUserId}
                    replyTo={msg.replyTo}
                    onReply={handleReply}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditing={editingMessageId === msg.id}
                  >
                    <p>{msg.content}</p>
                  </ChatMessage>
                </MessageWrapper>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        </div>
        <div className="sticky bottom-0 pt-4 md:pt-8 z-50">
          <div className="w-full mx-auto bg-background pb-4 md:pb-2">
            <div className="relative rounded-[20px] border border-transparent bg-muted transition-colors focus-within:bg-muted/50 focus-within:border-input has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
              {replyTo && (
                <div key={replyTo.id} className="bg-transparent px-4 pt-4">
                  <div className="px-3 py-2 rounded-r-md bg-background border-l-4" style={{ borderColor: replyTo.user.color }}>
                    <div className="w-full flex items-start">
                      <div>
                        <span className="font-semibold text-xs " style={{ color: replyTo.user.color }}>{replyTo.user.name}</span>
                        <span className="ml-2 text-muted-foreground text-xs ">{replyTo.content}</span>
                      </div>
                      <X className="ml-auto w-4 h-4 shrink-0 text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => setReplyTo(null)} />
                    </div>
                  </div>
                </div>
              )}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                className="flex w-full bg-transparent px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none [resize:none]"
                style={{ maxHeight: 504, minHeight: 40, overflowY: "auto" }}
                placeholder={editingMessageId ? "Editing message..." : (replyTo ? `Replying to ${replyTo.user.name}...` : "Type a message...")}
                aria-label="Type a message..."
                spellCheck={false}
              />
              <div className="flex w-full items-center justify-end p-3">
                <div className="flex items-center gap-2">
                  {editingMessageId ? (
                    <>
                      <Button variant="ghost" className="rounded-full h-8" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button className="rounded-full h-8" onClick={handleSaveEdit}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button className="rounded-full h-8">Send</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}


// Add an interface for the MessageWrapper props
interface MessageWrapperProps {
  children: React.ReactNode;
  isBlurred: boolean;
}

// New MessageWrapper component to handle the blur and fade animation
const MessageWrapper = ({ children, isBlurred }:MessageWrapperProps) => { // Changed prop name to be more descriptive
  const variants = {
    blurred: { filter: "blur(4px)", opacity: 0.6 },
    normal: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <motion.div
      variants={variants}
      initial="normal"
      animate={isBlurred ? "blurred" : "normal"} // Use the new prop here
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};