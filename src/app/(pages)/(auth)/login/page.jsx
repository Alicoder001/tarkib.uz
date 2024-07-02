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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { loginUser } from "@/requests";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/slices/user";
import { useRouter } from "next/navigation";

function DialogDemo({ open, setOpen }) {
  // change..
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Maxfiy so'zni tiklash</DialogTitle>
          <DialogDescription>
            Ro'yhatdan o'tgan telefon raqamingizni yozing. Biz ushbu telefon
            raqamga siz o'rnatgan maxfiy so'zni yuboramiz
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="phoneNumber">Telefon raqam*</Label>
            <PhoneNumberInput autoComplete={true} />
          </div>
        </div>
        <DialogFooter>
          <Button className="min-w-28" type="submit" disabled={isLoading}>
            {isLoading ? <UpdateIcon className="animate-spin" /> : "Tasdiqlash"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function handleSubmit(e) {
    let checker = true;
    e.preventDefault();
    const { password, nickname } = getFormData(e.target);
    const pL = password.trim().length;

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
              {/* <PhoneNumberInput autoComplete={true} /> */}
              <Input
                id="nickname"
                placeholder="Taxallusingizni kiriting"
                type="text"
                name="nickname"
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
                onClick={() => setOpen(!open)}
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
      <DialogDemo open={open} setOpen={setOpen} />
    </>
  );
}
