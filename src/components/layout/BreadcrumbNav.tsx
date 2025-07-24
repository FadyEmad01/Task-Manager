"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NAVIGATION_DATA } from "@/constants/sidebar";
import { usePathname } from "next/navigation";

export default function BreadcrumbNav() {
  const pathname = usePathname();

  // Find current item
  const allItems = NAVIGATION_DATA.navMain.flatMap((section) => section.items);
  const current = allItems.find((item) => pathname === item.url);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="hidden md:block" />

        <BreadcrumbItem>
          <BreadcrumbPage>
            {current?.title ?? "Unknown"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
