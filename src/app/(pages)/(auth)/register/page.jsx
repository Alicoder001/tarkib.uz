"use client";
import AvatarViewer from "@/components/custom/AvatarViewer";
import PhoneNumberInput from "@/components/custom/PhoneNumberInput";
import VerifyOTP from "@/components/custom/VerifyOTP";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setFirstName, setLastName, setSrc } from "@/lib/redux/slices/avatar";
import { setUser } from "@/lib/redux/slices/user";
import { registerUser, uploadFile } from "@/requests";
import { getFormData } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ImgRegister from "/public/register.svg";

export default function Register() {
  const { src } = useSelector((state) => state.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyOTPModal, setVerifyOTPModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    let checker = true;
    e.preventDefault();
    const user = getFormData(e.target);
    const { firstName, nickname, password, phoneNumber } = user;

    const fL = firstName.trim().length;
    const nL = nickname.trim().length;
    const pL = password.trim().length;
    const pnL = phoneNumber.trim().length;

    // Validation
    if (fL === 0) {
      toast.info("Ismingizni kiriting");
      checker = false;
    }

    if (!(fL === 0) && !(fL > 2)) {
      toast.info("Ism eng kamida 3 belgidan iborat bo'lishi kerak");
      checker = false;
    }

    if (!(fL === 0) && fL > 2 && nL === 0) {
      toast.info("Taxallus tanlang");
      checker = false;
    }

    if (!(fL === 0) && fL > 2 && !(nL === 0) && !(nL > 3)) {
      toast.info("Taxallus eng kamida 4 belgidan iborat bo'lishi kerak");
      checker = false;
    }

    if (pnL.length === 0) {
      toast.info("Telefon raqamingizni kiriting");
      checker = false;
    }

    if (!(fL === 0) && fL > 2 && !(nL === 0) && pL === 0) {
      toast.info("Maxfiy so'zni kiriting");
      checker = false;
    }

    if (!(fL === 0) && fL > 2 && !(nL === 0) && !(pL === 0) && !(pL > 5)) {
      toast.info("Maxfiy so'z eng kamida 6 belgidan iborat bo'lishi kerak");
      checker = false;
    }

    // Set avatar
    user.avatar = src;

    if (checker) {
      setIsLoading(true);
      toast.promise(registerUser(user), {
        loading: "Ma'lumotlar tekshirilmoqda...",
        success({ message }) {
          toast.dismiss();
          dispatch(setUser(user));
          toast.success(message);
          setIsLoading(false);
          setVerifyOTPModal(true);
        },
        error(message) {
          setIsLoading(false);
          return message;
        },
      });
    }
  }

  function handleFile(e) {
    const file = e.target.files[0];
    const size = file.size / 1024;
    const allowSize = 1024;

    if (size > allowSize) {
      toast.info(
        "Rasm hajmi 1 mbdan katta bo'lmasligi kerak, qayta urunib ko'ring",
      );
    } else {
      setIsUploading(true);
      toast.promise(uploadFile(file), {
        loading: "Rasm yuklanmoqda...",
        success({ url }) {
          toast.dismiss();
          dispatch(setSrc(url));
          setIsUploading(false);
        },
        error(message) {
          setIsUploading(false);
          return message;
        },
      });
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
    <>
      <section className="flex h-full">
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
            className="flex w-full flex-col gap-2 px-5 transition-opacity sm:px-10 md:px-24 lg:px-20"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto select-none">
              <label className="group" htmlFor="avatar">
                <AvatarViewer disabled={isUploading} />
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
            <div>
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
              Ro'yhatdan o'tish
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
      <VerifyOTP open={verifyOTPModal} onOpenChange={setVerifyOTPModal} />
    </>
  );
}
