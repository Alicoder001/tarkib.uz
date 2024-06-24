"use client";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
import AvatarViewer from "./AvatarViewer";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "..//ui/command";
import { useState } from "react";

export default function Header() {
  const [showCommand, setSetShowCommand] = useState(false);
  return (
    <header className="py-[15px] shadow-md">
      <div className="container flex justify-between">
        <Image
          src={"/assets/logo-light.svg"}
          width={120}
          height={30}
          alt="logo-light"
        />
        <div
          onClick={() => {
            setSetShowCommand(!showCommand);
          }}
          className={`relative`}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {showCommand && (
            <div className="absolute right-[0] top-[155%] w-[260px] shadow-md">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
