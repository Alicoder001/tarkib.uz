import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon } from "@radix-ui/react-icons";

export default function AvatarViewer() {
  return (
    <div className="relative overflow-hidden">
      <Avatar>
        <AvatarImage src=""></AvatarImage>
        <AvatarFallback>
          <span className="hidden group-hover:hidden lg:block">?</span>
        </AvatarFallback>
        <span className="absolute inset-0 flex translate-y-[60%] cursor-pointer justify-center bg-[rgba(0,0,0,0.5)] pt-1 transition active:opacity-80 lg:translate-y-full lg:group-hover:translate-y-[60%]">
          <CameraIcon color="white" />
        </span>
      </Avatar>
    </div>
  );
}
