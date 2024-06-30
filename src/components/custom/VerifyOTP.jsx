import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { toast } from "sonner";
import { getFormData } from "@/utils";
import { verifyOTP } from "@/requests";
import { useSelector } from "react-redux";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function InputOTPPattern() {
  const [value, setValue] = useState("");
  return (
    <InputOTP
      onChange={(value) => {
        setValue(value);
      }}
      name="code"
      value={value}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

export default function VerifyOTP({ open, onOpenChange }) {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleVerify(e) {
    e.preventDefault();
    const { code } = getFormData(e.target);
    if (code.length === 6) {
      setIsLoading(true);
      console.log(user.phoneNumber);
      toast.promise(
        verifyOTP({
          phoneNumber: user.phoneNumber,
          code,
        }),
        {
          loading: "Tasdiqlash kodi tekshirilmoqda...",
          success() {
            toast.dismiss();
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
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tasdiqlash jarayoni</DialogTitle>
            <DialogDescription>
              Kiritilgan telefon raqamga yuborilgan bir martalik tasdiqlash
              kodini kiriting
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVerify}>
            <InputOTPPattern />
            <DialogFooter className="mt-5">
              <Button className="min-w-28" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <UpdateIcon className="animate-spin" />
                ) : (
                  "Tasdiqlash"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
