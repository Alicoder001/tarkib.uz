"use client";
import { setUser } from "@/lib/redux/slices/user";
import { logoutUser } from "@/requests";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const firstNameLetter = user?.firstName[0].toUpperCase();
  const lastNameLetter = user?.lastName[0].toUpperCase();
  const [showCommand, setSetShowCommand] = useState(false);

  function handleLogout() {
    toast.promise(logoutUser(user.accessToken), {
      success({ message }) {
        dispatch(setUser(null));
        return message;
      },
      error(message) {
        return message;
      },
    });
  }

  function handleWrite() {
    if (user) {
      router.push("/write");
    } else alert("Kechirasiz");
  }

  return (
    <header className="py-4 shadow-sm">
      <div className="base-container flex items-center justify-between">
        <Link href={"/"}>
          <Image
            className="h-8 w-32"
            src={"/assets/logo-light.svg"}
            width="128"
            height="32"
            alt="logo-light"
            priority
          />
        </Link>
        <div
          onClick={() => {
            setSetShowCommand(!showCommand);
          }}
          className={`flex items-center gap-6`}
        >
          <Button onClick={handleWrite} variant="secondary">
            <Pencil2Icon className="mr-2 h-4 w-4" />
            Yozish
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ml-5">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="flex h-full w-full items-center justify-center bg-muted">
                    {firstNameLetter + lastNameLetter}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>@{user.nickname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    Sozlamalar
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                  Chiqish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
