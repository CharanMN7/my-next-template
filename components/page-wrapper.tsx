"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const paths = currentPath.split("/").filter((path) => path);

  const getNameForPath = (path: string): string => {
    return path.split("-").join(" ");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {/* Breadcrumb list is created dynamically using the current path name */}
              {paths.map((path, index) => {
                if (index == paths.length - 1) {
                  return (
                    <BreadcrumbItem key={path} className="hidden md:block">
                      <BreadcrumbPage className="capitalize">
                        {getNameForPath(path)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  );
                }
                return (
                  <>
                    <BreadcrumbItem key={path} className="hidden md:block">
                      <BreadcrumbLink
                        href={`/${paths.slice(0, index + 1).join("/")}`}
                        className="capitalize"
                      >
                        {getNameForPath(path)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index != 0 || index != paths.length - 1 ? (
                      <BreadcrumbSeparator />
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}