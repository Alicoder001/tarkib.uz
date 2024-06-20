"use client";
import Image from "next/image";
import ImgRegister from "/public/register.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AvatarViewer from "@/components/custom/AvatarViewer";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { getFormData } from "@/utils";
import { toast } from "sonner";

export default function Register() {
  document.title = "Ro'yhatdan o'tish";
  const isLoading = false;
  function handleSubmit(e) {
    e.preventDefault();
    const result = getFormData(e.target);
    const { firstName, nickname, password } = result;

    // Validation
    if (firstName.trim().length === 0) {
      toast.info("Ismingizni kiriting");
    }

    if (!(firstName.trim().length === 0) && !(firstName.length > 2)) {
      toast.info("Ism eng kamida 3 belgidan iborat bo'lishi kerak");
    }

    if (
      !(firstName.trim().length === 0) &&
      firstName.length > 2 &&
      nickname.trim().length === 0
    ) {
      toast.info("Taxallus tanlang");
    }

    if (
      !(firstName.trim().length === 0) &&
      firstName.length > 2 &&
      !(nickname.trim().length === 0)
    ) {
      function promise() {
        return new Promise((resolve, reject) =>
          setTimeout(() => {
            const randomValue = Math.random();
            if (randomValue >= 0.5) return resolve({ text: nickname.trim() });
            else return reject({ text: nickname.trim() });
          }, 2000),
        );
      }

      toast.promise(promise, {
        loading: "Tekshirilmoqda...",
        success: (data) => {
          return `@${data.text} taxallusini tanlasangiz bo'ladi`;
        },
        error: (data) => {
          return `@${data.text} taxallusi band, boshqa taxallus tanlang`;
        },
      });
    }

    if (
      !(firstName.trim().length === 0) &&
      firstName.length > 2 &&
      !(nickname.trim().length === 0) &&
      password.trim().length === 0
    ) {
      toast.info("Maxfiy so'zni kiriting");
    }

    if (
      !(firstName.trim().length === 0) &&
      firstName.length > 2 &&
      !(nickname.trim().length === 0) &&
      !(password.trim().length === 0) &&
      !(password.trim().length > 5)
    ) {
      toast.info("Maxfiy so'z eng kamida 6 belgidan iborat bo'lishi kerak");
    }
  }
  return (
    <section className="flex h-full">
      <div className="pointer-events-none hidden w-2/4 select-none items-center justify-center bg-slate-50 lg:flex">
        <Image
          className="aspect-square"
          src={ImgRegister}
          width="400"
          height="400"
          alt="Register"
          priority
        />
      </div>

      <div className="flex h-full w-full items-center justify-center lg:w-2/4 lg:px-10">
        <form
          className="flex w-full flex-col gap-2 px-5 sm:px-10 md:px-24 lg:px-20"
          onSubmit={handleSubmit}
          action="POST"
        >
          <div className="mx-auto select-none">
            <label className="group" htmlFor="avatar">
              <AvatarViewer />
            </label>
            <Input
              className="sr-only fixed"
              id="avatar"
              type="file"
              name="avatar"
            />
          </div>
          <div>
            <Label htmlFor="firstName">Ism*</Label>
            <Input
              id="firstName"
              placeholder="Ismingizni kiriting"
              type="text"
              name="firstName"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Familiya</Label>
            <Input
              id="lastName"
              placeholder="Familiyangizni kiriting"
              type="text"
              name="lastName"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Taxallus*</Label>
            <Input
              id="nickname"
              placeholder="Taxallus tanlang"
              type="text"
              name="nickname"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="password">Maxfiy so'z*</Label>
            <Input
              id="password"
              placeholder="Maxfiy so'z kiriting"
              type="password"
              name="password"
              autoComplete="off"
            />
          </div>
          <Button className="mt-3" type="submit" disabled={isLoading}>
            {isLoading ? (
              <UpdateIcon className="animate-spin" />
            ) : (
              "Ro'yhatdan o'tish"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
