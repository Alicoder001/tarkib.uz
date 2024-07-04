"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  function capitalize(string) {
    if (!string) return string; // Agar string bo'sh bo'lsa, uni o'ziga qaytaring
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if (pathnames.length > 0)
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((path, index) => {
            const href = `/${pathnames.slice(0, index - 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {!isLast ? (
                    <>
                      <BreadcrumbLink href={href}>
                        {capitalize(path)}
                      </BreadcrumbLink>
                    </>
                  ) : (
                    <>
                      {" "}
                      <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
                    </>
                  )}
                </BreadcrumbItem>
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
};

export default BreadCrumb;
