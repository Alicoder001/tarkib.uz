import Image from "next/image";
import ImgRegister from "/public/register.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AvatarViewer from "@/components/custom/AvatarViewer";

export default function Register() {
  return (
    <section className="flex h-full">
      <div className="hidden w-2/4 items-center justify-center">
        <Image
          src={ImgRegister}
          width="400"
          height="400"
          alt="Register"
          priority
        />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <form className="container flex flex-col gap-2">
          <div className="mx-auto mb-2">
            <label className="group" htmlFor="avatar">
              <AvatarViewer />
            </label>
            <Input className="sr-only" id="avatar" type="file" name="avatar" />
          </div>
          <div>
            <Label htmlFor="firstName">Ism*</Label>
            <Input
              id="firstName"
              placeholder="Ismingizni kiriting"
              type="text"
              name="firstName"
              requried="true"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Familiya</Label>
            <Input
              id="lastName"
              placeholder="Familiyangizni kiriting"
              type="text"
              name="lastName"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Taxallus*</Label>
            <Input
              id="nickname"
              placeholder="Taxallus tanlang"
              type="text"
              name="nickname"
              requried="true"
            />
          </div>
          <div>
            <Label htmlFor="password">Maxfiy so'z*</Label>
            <Input
              id="password"
              placeholder="Maxfiy so'z kiriting"
              type="password"
              name="password"
              requried="true"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
