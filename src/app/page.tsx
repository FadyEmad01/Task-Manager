import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-dvh flex flex-col justify-center items-center gap-2">
        <Link
          className={buttonVariants({
            size: "default",
            variant: "default",
            className: "rounded-full",
          })}
          href="/dashboard">

          Go to dashboard</Link>
        <Link
          className={buttonVariants({
            size: "default",
            variant: "default",
            className: "rounded-full",
          })}
          href="/auth/login">

          Login</Link>
        <Link
          className={buttonVariants({
            size: "default",
            variant: "default",
            className: "rounded-full",
          })}
          href="/auth/authentication">

          Authentication</Link>
      </div>
    </>
  );
}
