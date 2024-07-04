import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { setUser } from "@/lib/redux/slices/user";
import { verifyOTP } from "@/requests";
import { getFormData } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import InputOTPPattern from "./InputOTPPattern";

export default function VerifyOTP({ open, onOpenChange }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleVerify(e) {
    e.preventDefault();
    const { code } = getFormData(e.target);
    console.log(user);
    if (code.length === 6) {
      setIsLoading(true);
      toast.promise(
        verifyOTP({
          phoneNumber: user?.phoneNumber,
          code,
        }),
        {
          loading: "Tasdiqlash kodi tekshirilmoqda...",
          success(user) {
            toast.dismiss();
            dispatch(setUser(user));
            toast.success("Ro'yhatdan o'tish muvaffaqiyatli yakunlandi");
            setIsLoading(false);
            router.push("/");
          },
          error(message) {
            setIsLoading(false);
            return message;
          },
        },
      );
    } else {
      toast.info("Tasdiqlash uchun 6 xonali son bo'lish kerak");
    }
  }
  return (
    <>
      <Dialog
        className={`transition-opacity ${isLoading ? "pointer-events-none opacity-60" : ""}`}
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tasdiqlash jarayoni</DialogTitle>
            <DialogDescription>
              Kiritilgan telefon raqamga yuborilgan bir martalik tasdiqlash
              kodini kiriting
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col items-center sm:items-start"
            onSubmit={handleVerify}
          >
            <InputOTPPattern />
            <DialogFooter className="mt-5">
              <Button className="min-w-28" type="submit">
                Tasdiqlash
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
