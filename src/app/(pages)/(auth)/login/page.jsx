"use client";
import Image from "next/image";
import ImgLogin from "/public/login.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { getFormData } from "@/utils";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import PhoneNumberInput from "@/components/custom/PhoneNumberInput";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { password } = getFormData(e.target);
    const pL = password.trim().length;

    // Validation
    if (pL === 0) {
      toast.info("Maxfiy so'zni kiriting", { position: "bottom-left" });
    }

    if (!(pL === 0) && !(pL > 5)) {
      toast.info("Maxfiy so'z eng kamida 6 belgidan iborat bo'lishi kerak", {
        position: "bottom-left",
      });
    }
  }

  return (
    <section
      className={`flex h-full ${isLoading ? "pointer-events-none select-none" : ""}`}
    >
      <div className="flex h-full w-full items-center justify-center lg:w-2/4 lg:px-10">
        <form
          className="flex w-full flex-col gap-2 px-5 sm:px-10 md:px-24 lg:px-20"
          onSubmit={handleSubmit}
          action="POST"
        >
          <div style={{ display: "none" }}>
            <Label htmlFor="phoneNumber">Telefon raqam*</Label>
            <PhoneNumberInput autoComplete={true} />
          </div>
          <div>
            <Label htmlFor="password">Maxfiy so'z*</Label>
            <Input
              id="password"
              placeholder="Maxfiy so'z kiriting"
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <Button className="mt-3" type="submit" disabled={isLoading}>
            {isLoading ? <UpdateIcon className="animate-spin" /> : "Kirish"}
          </Button>
          <div className="flex justify-center text-xs">
            <Link className="underline hover:no-underline" href="/register">
              Ro'yhatdan o'tish
            </Link>
          </div>
          <div className="flex justify-center text-xs">
            <button className="underline hover:no-underline" type="button">
              Maxfiy so'zni qayta o'rnating
            </button>
          </div>
        </form>
      </div>

      <div className="pointer-events-none hidden w-2/4 select-none flex-col items-center justify-center bg-slate-50 lg:flex">
        <h1 className="text-4xl font-bold">Kirish</h1>
        <Image
          className="aspect-square"
          src={ImgLogin}
          width="400"
          height="400"
          alt="Register"
          priority
        />
      </div>
    </section>
  );
}
