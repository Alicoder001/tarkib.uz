"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { setAlertLoginModal } from "@/lib/redux/slices/modals";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export function AlertLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { alertLoginModal } = useSelector((state) => state.modals);
  return (
    <AlertDialog
      open={alertLoginModal}
      onOpenChange={() => dispatch(setAlertLoginModal())}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            tarkib.uz saytidan ro'yhatdan o'tasizmi?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Yangi retsept yozmoqchi bo'lsangiz siz oldin tarkib.uz saytidan
            ro'yhatdan o'tgan bo'lishingiz kerak, agar siz ro'yhatdan o'tgan
            bo'lsangiz, shaxsiy profilingizga kiring, ro'yhatdan o'tmagan
            bo'lsangiz "Ro'yhatdan o'tish" tugmasini bosish orqali ro'yhatdan
            o'ting
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction onClick={() => router.push("/register")}>
            Ro'yhatdan o'tish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
