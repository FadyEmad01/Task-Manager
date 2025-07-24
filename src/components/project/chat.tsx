"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiShining2Line,} from "@remixicon/react";
import { useRef, useEffect, useState } from "react";
import { ChatMessage, } from "../layout/chat-message";
import { X } from "lucide-react";
import {fakeUsers} from "@/constants/fakeUsers"
import { chatUser } from "@/types/chatUser";


const fakeMessages = [
  {
    id: "m1",
    user: fakeUsers[0],
    content: <p>Hey everyone! Ready for the project meeting?</p>,
  },
  {
    id: "m2",
    user: fakeUsers[1],
    content: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci aliquam rem amet corrupti maxime necessitatibus saepe, delectus labore, suscipit a corporis non nostrum accusantium maiores numquam deleniti sapiente praesentium est!</p>,
  },
  {
    id: "m3",
    user: fakeUsers[2],
    content: <p>Hey Bob, hey Alice! I'm here. Let's get started.</p>,
  },
  {
    id: "m4",
    user: fakeUsers[1],
    content: <p>Great! First, let's review last week's tasks.</p>,
    replyTo: {
      user: fakeUsers[2],
      content: <span>I'm here. Let's get started.</span>,
    },
  },
  {
    id: "m5",
    user: fakeUsers[0],
    content: <p>Sure! I finished the UI updates and pushed to GitHub.</p>,
  },
  {
    id: "m6",
    user: fakeUsers[0],
    content: <p>Hey everyone! Ready for the project meeting?</p>,
    replyTo: {
      user: fakeUsers[2],
      content: <span>I'm here. Let's get started.</span>,
    },
  },
];

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Simulate current user as Alice
  const currentUserId = "1";
  const [replyTo, setReplyTo] = useState<null | { id: string; user: chatUser; content: React.ReactNode }>(null);

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [replyTo]);

  return (
    <ScrollArea className="flex-1 h-full w-full bg-background">
      <div className="h-full flex flex-col px-4 md:px-6 lg:px-8">
        {/* Chat */}
        <div className="relative grow">
          <div className=" mx-auto mt-6 space-y-6">
            <div className="text-center my-8">
              <div className="inline-flex items-center bg-white rounded-full border border-black/[0.08] shadow-xs text-xs font-medium py-1 px-3 text-foreground/80">
                <RiShining2Line
                  className="me-1.5 text-muted-foreground/70 -ms-1"
                  size={14}
                  aria-hidden="true"
                />
                Today
              </div>
            </div>
            {fakeMessages.map((msg) => (
              <ChatMessage
                key={msg.id}
                id={msg.id}
                user={msg.user}
                isOwn={msg.user.id === currentUserId}
                replyTo={msg.replyTo}
                onReply={(messageId) => {
                  setReplyTo({ id: messageId, user: msg.user, content: msg.content });
                }}
              >
                {msg.content}
              </ChatMessage>
            ))}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        </div>
        {/* Footer */}
        <div className="sticky bottom-0 pt-4 md:pt-8 z-50">
          <div className="w-full mx-auto bg-background pb-4 md:pb-2">
            <div className="relative rounded-[20px] border border-transparent bg-muted transition-colors focus-within:bg-muted/50 focus-within:border-input has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
              {/* Reply preview in input */}
              {replyTo && (
                <div className="bg-transparent px-4 pt-4">
                  <div className="text-xs px-3 py-2 rounded-r-md  bg-background border-l-4" style={{ borderColor: replyTo.user.color }}>
                    <div className="w-full flex items-start">
                      <div>
                        <span className="font-semibold" style={{ color: replyTo.user.color }}>{replyTo.user.name}</span>
                        <span className="ml-2 text-muted-foreground">{replyTo.content}</span>
                      </div>
                      {/* <button className="ml-auto text-xs text-muted-foreground hover:text-foreground" onClick={() => setReplyTo(null)}>Cancel</button> */}
                      <X size={16} className="ml-auto text-xs text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => setReplyTo(null)} />
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
                placeholder={replyTo ? `Replying to ${replyTo.user.name}...` : "Type a message..."}
                aria-label="Type a message..."
              />
              {/* send button */}
              <div className="flex w-full items-center justify-end p-3">
                <div className="flex items-center gap-2">
                  <Button className="rounded-full h-8">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}