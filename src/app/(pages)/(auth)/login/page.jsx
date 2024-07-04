"use client";
import PhoneNumberInput from "@/components/custom/PhoneNumberInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormData } from "@/utils";
import { UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ImgLogin from "/public/login.svg";

import ForgotPasswordVerifyOTP from "@/components/custom/ForgotPasswordVerifyOTP";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setModalForgotPasswordVerifyOTP } from "@/lib/redux/slices/modals";
import { setUser } from "@/lib/redux/slices/user";
import { forgotPassword, loginUser } from "@/requests";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function DialogDemo({ forgotPasswordModal, setForgotPasswordModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const data = getFormData(e.target);
    setIsLoading(true);
    toast.promise(forgotPassword(data), {
      loading: "Tekshirilmoqda...",
      success({ message }) {
        setForgotPasswordModal(!forgotPasswordModal);
        dispatch(setModalForgotPasswordVerifyOTP());
        setIsLoading(false);
        return message;
      },
      error(message) {
        setIsLoading(false);
        return message;
      },
    });
  }

  return (
    <Dialog
      className={`transition-opacity ${isLoading ? "pointer-events-none opacity-60" : ""}`}
      open={forgotPasswordModal}
      onOpenChange={setForgotPasswordModal}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Maxfiy so'zni tiklash</DialogTitle>
          <DialogDescription>
            Ro'yhatdan o'tgan telefon raqamingizni yozing. Biz ushbu telefon
            raqamga vaqtinchalik foydalanish uchun maxfiy so'z yuboramiz.
            Profilingizga kirgach, maxfiy so'zni o'zgartirishingiz kerak bo'ladi
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form
            className="flex flex-col items-center sm:items-start"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <Label htmlFor="phoneNumber">Telefon raqam*</Label>
              <PhoneNumberInput autoComplete={true} />
            </div>
            <DialogFooter className="pt-6">
              <Button className="min-w-28" type="submit">
                Tasdiqlash
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  function handleSubmit(e) {
    let checker = true;
    e.preventDefault();
    const { password, nickname } = getFormData(e.target);
    const pL = password.trim().length;
    const nL = nickname.trim().length;

    // Validation
    if (pL === 0) {
      toast.info("Maxfiy so'zni kiriting", {
        position: "bottom-left",
      });
      checker = false;
    }

    if (!(pL === 0) && !(pL > 5)) {
      toast.info("Maxfiy so'z eng kamida 6 belgidan iborat bo'lishi kerak", {
        position: "bottom-left",
      });
      checker = false;
    }

    if (nL === 0) {
      toast.info("Taxallusingizni kiriting", {
        position: "bottom-left",
      });
      checker = false;
    }

    if (!(nL === 0) && !(nL > 3)) {
      toast.info("Taxallus eng kamida 4 belgidan iborat bo'lishi kerak", {
        position: "bottom-left",
      });
      checker = false;
    }

    if (checker) {
      setIsLoading(true);
      toast.promise(loginUser({ password, nickname }), {
        loading: "Profilingizga kirilmoqda...",
        success(user) {
          setIsLoading(false);
          dispatch(setUser(user));
          router.push("/");
          return "Profilingizga muvaffaqiyatli kirdingiz";
        },
        error(message) {
          setIsLoading(false);
          return message;
        },
      });
    }
  }

  return (
    <>
      <section
        className={`flex h-full ${isLoading ? "pointer-events-none select-none" : ""}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center transition-opacity lg:w-2/4 lg:px-10 ${isLoading ? "pointer-events-none, opacity-60" : ""}`}
        >
          <form
            className="flex w-full flex-col gap-2 px-5 sm:px-10 md:px-24 lg:px-20"
            onSubmit={handleSubmit}
            action="POST"
          >
            <div>
              <Label htmlFor="nickname">Taxallus*</Label>
              <Input
                id="nickname"
                placeholder="Taxallusingizni kiriting"
                type="text"
                name="nickname"
                autoComplete="nickname"
              />
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
              <button
                onClick={() => setForgotPasswordModal(!forgotPasswordModal)}
                className="underline hover:no-underline"
                type="button"
              >
                Maxfiy so'zni tiklash
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
      <DialogDemo
        forgotPasswordModal={forgotPasswordModal}
        setForgotPasswordModal={setForgotPasswordModal}
      />
      <ForgotPasswordVerifyOTP />
    </>
  );
}
