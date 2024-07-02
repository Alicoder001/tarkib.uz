import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function AvatarViewer({ disabled }) {
  const { src, firstName, lastName } = useSelector((state) => state.avatar);
  return (
    <div
      className={`relative overflow-hidden transition-opacity ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      <Avatar className="h-16 w-16">
        <AvatarImage
          onLoad={() => toast.success("Avatar rasmi muvaffaqiyatli yangilandi")}
          onError={() =>
            toast.error(
              "Avatar rasmini yuklashni iloji bo'lmadi, qayta urunib ko'ring",
            )
          }
          src={src}
        ></AvatarImage>
        <AvatarFallback>{`${firstName}${lastName}`}</AvatarFallback>
        <span className="absolute inset-0 flex translate-y-[60%] cursor-pointer justify-center bg-[rgba(0,0,0,0.5)] pt-1 transition active:opacity-80 lg:translate-y-full lg:group-hover:translate-y-[60%]">
          <CameraIcon color="white" />
        </span>
      </Avatar>
    </div>
  );
}
