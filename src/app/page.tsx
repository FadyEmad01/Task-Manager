import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center">
        <Link
          className={buttonVariants({
            size:"default",
            variant: "default",
            className: "rounded-full",
          })}
          href="/dashboard">

          Go to dashboard</Link>
      </div>
    </>
  );
}
