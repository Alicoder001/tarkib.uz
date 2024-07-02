"use client";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logoutUser } from "@/requests";
import { setUser } from "@/lib/redux/slices/user";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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

  return (
    <header className="py-4 shadow-md">
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
          <Pencil2Icon
            className="h-6 w-6 hover:cursor-pointer md:h-8 md:w-8 lg:h-10 lg:w-10"
            width={24}
            height={24}
            color="gray"
          />
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {firstNameLetter + lastNameLetter}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>@{user.nickname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Sozlamalar</DropdownMenuItem>
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
