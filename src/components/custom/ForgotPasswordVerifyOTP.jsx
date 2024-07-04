import { setModalForgotPasswordVerifyOTP } from "@/lib/redux/slices/modals";
import { verifyForgotPasswordOTP } from "@/requests";
import { getFormData } from "@/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import InputOTPPattern from "./InputOTPPattern";

export default function ForgotPasswordVerifyOTP() {
  const { forgotPasswordVerifyOTPModal } = useSelector((state) => state.modals);
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  function handleVerify(e) {
    e.preventDefault();
    const { code } = getFormData(e.target);
    if (code.length === 6) {
      setIsLoading(true);
      toast.promise(
        verifyForgotPasswordOTP({
          phoneNumber: user?.phoneNumber,
          code,
        }),
        {
          loading: "Tasdiqlash kodi tekshirilmoqda...",
          success(data) {
            console.log(data);
            return "Telefon raqamingizga vaqtinchalik foydalanish uchun 6 xonali maxfiy kalit yuborildi";
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
    <Dialog
      className={`transition-opacity ${isLoading ? "pointer-events-none opacity-60" : ""}`}
      open={forgotPasswordVerifyOTPModal}
      onOpenChange={setModalForgotPasswordVerifyOTP}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tasdiqlash jarayoni</DialogTitle>
          <DialogDescription>
            Telefon raqamingizga yuborilgan 6 xonali tasdiqlash kodini kiriting.
            Agar tasdiqlash kodi to'g'ri bo'lsa biz telefon raqamingizga
            vaqtinchalik foydalanish uchun 6 xonali maxfiy kalitni yuboramiz.
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
  );
}
