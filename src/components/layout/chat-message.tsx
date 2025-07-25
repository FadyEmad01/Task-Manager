import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as React from "react";
import { Reply } from "lucide-react";
import { chatUser } from "@/types/chatUser";
import { ChatMessageProps } from "@/types/ChatMessageProps";



export function ChatMessage({ user, children, isOwn, onReply, id, replyTo }: ChatMessageProps) {
  return (
    <article
      className={cn(
        "flex items-start gap-4 text-[15px] leading-relaxed",
        isOwn && "justify-end"
      )}
    >
      <img
        className={cn(
          "rounded-full border border-black/[0.08] shadow-sm",
          isOwn && "order-1"
        )}
        src={user.avatar}
        alt={user.name + " profile"}
        width={40}
        height={40}
      />
      <div className={cn(
        "flex flex-col gap-1",
        isOwn ? "items-end" : "items-start"
      )}>
        {/* User name */}
        <span
          className="font-semibold text-sm mb-1"
          style={{ color: user.color }}
        >
          {user.name}
        </span>

        <div className="flex items-center gap-x-4">
          {/* Message bubble */}
          <div
            className={cn(
              "px-4 py-3 rounded-xl min-w-[60px] max-w-[350px] break-words",
              isOwn ? "bg-primary text-white" : "bg-muted "
            )}
            style={!isOwn ? { borderColor: user.color } : {}}
          >
            <div className="flex flex-col gap-y-1">
              {/* Reply preview */}
              {replyTo && (
                <div className="text-xs px-3 py-2 rounded-r-md  bg-background/90 border-l-4" style={{ borderColor: replyTo.user.color }}>
                  <span className="font-semibold" style={{ color: replyTo.user.color }}>{replyTo.user.name}</span>
                  <span className="ml-2 text-muted-foreground">{replyTo.content}</span>
                </div>
              )}
              <p className="sr-only">{user.name} said:</p>
              {children}
            </div>

          </div>
          {/* Actions */}
          {!isOwn && (
            <div className="flex gap-1">
              <MessageActions onReply={() => onReply && onReply(id)} />
            </div>
          )}
        </div>

      </div>
    </article>
  );
}

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className="relative text-muted-foreground/80 hover:text-foreground transition-colors size-8 flex items-center justify-center before:absolute before:inset-y-1.5 before:left-0 before:w-px before:bg-border first:before:hidden first-of-type:rounded-s-lg last-of-type:rounded-e-lg focus-visible:z-10 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70"
        >
          {icon}
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="dark px-2 py-1 text-xs">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function MessageActions({ onReply }: { onReply?: () => void }) {
  return (
    <div className="relative inline-flex bg-muted rounded-full border border-muted/[0.08] shadow-sm -space-x-px">
      <TooltipProvider delayDuration={0}>
        {/* <ActionButton icon={<RiCodeSSlashLine size={16} />} label="Show code" />
        <ActionButton icon={<RiBookLine size={16} />} label="Bookmark" />
        <ActionButton icon={<RiLoopRightFill size={16} />} label="Refresh" />
        <ActionButton icon={<RiCheckLine size={16} />} label="Approve" /> */}
        <ActionButton icon={<Reply size={16} />} label="Reply" onClick={onReply} />
      </TooltipProvider>
    </div>
  );
}