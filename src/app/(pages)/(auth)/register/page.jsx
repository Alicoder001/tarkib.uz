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
import { setFirstName, setLastName, setSrc } from "@/lib/redux/slices/avatar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import PhoneNumberInput from "@/components/custom/PhoneNumberInput";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const { firstName, nickname, password } = getFormData(e.target);

    const fL = firstName.trim().length;
    const nL = nickname.trim().length;
    const pL = password.trim().length;

    // Validation
    if (fL === 0) {
      toast.info("Ismingizni kiriting");
    }

    if (!(fL === 0) && !(fL > 2)) {
      toast.info("Ism eng kamida 3 belgidan iborat bo'lishi kerak");
    }

    if (!(fL === 0) && fL > 2 && nL === 0) {
      toast.info("Taxallus tanlang");
    }

    if (!(fL === 0) && fL > 2 && !(nL === 0) && !(nL > 3)) {
      toast.info("Taxallus eng kamida 4 belgidan iborat bo'lishi kerak");
    }

    if (!(fL === 0) && fL > 2 && !(nL === 0) && nL > 3) {
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

    if (!(fL === 0) && fL > 2 && !(nL === 0) && pL === 0) {
      toast.info("Maxfiy so'zni kiriting");
    }

    if (!(fL === 0) && fL > 2 && !(nL === 0) && !(pL === 0) && !(pL > 5)) {
      toast.info("Maxfiy so'z eng kamida 6 belgidan iborat bo'lishi kerak");
    }
  }

  function handleFile(e) {
    const file = e.target.files[0];
    const size = file.size / 1024;
    const allowSize = 1024;
    if (size > allowSize) {
      toast.info(
        "Rasm hajmi 1 mbdan katta bo'lmasligi kerak, rasm hajmini kichiklashtirish uchun tiny.png saytidan foydalanasngiz bo'ladi",
      );
    } else {
      const url = URL.createObjectURL(file);
      dispatch(setSrc(url));
    }
  }

  function handleFallBackTextFirstName({ target: { value } }) {
    const inputValue = value.trim() === "" ? value.trim() : value.trim();
    const fallbackText = inputValue === "" ? "?" : inputValue.toUpperCase()[0];
    dispatch(setFirstName(fallbackText));
  }

  function handleFallBackTextLastName({ target: { value } }) {
    const inputValue = value.trim() === "" ? value.trim() : value.trim();
    const fallbackText =
      inputValue === "" ? inputValue : inputValue.toUpperCase()[0];
    dispatch(setLastName(fallbackText));
  }

  return (
    <section
      className={`flex h-full ${isLoading ? "pointer-events-none select-none" : ""}`}
    >
      <div className="pointer-events-none hidden w-2/4 select-none flex-col items-center justify-center bg-slate-50 lg:flex">
        <h1 className="text-4xl font-bold">Ro'yhatdan o'tish</h1>
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
              onChange={handleFile}
              id="avatar"
              type="file"
              name="avatar"
              accept=".jpg,.jpeg,.png"
            />
          </div>
          <div>
            <Label htmlFor="firstName">Ism*</Label>
            <Input
              onInput={handleFallBackTextFirstName}
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
              onInput={handleFallBackTextLastName}
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
          <div style={{ display: "none" }}>
            <Label htmlFor="phoneNumber">Telefon raqam*</Label>
            <PhoneNumberInput />
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
          <div className="flex justify-center text-xs">
            <span className="mr-2">Ro'yhatdan o'tganmisiz ?</span>
            <Link className="underline hover:no-underline" href="/login">
              Kirish
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
