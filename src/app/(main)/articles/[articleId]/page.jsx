import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PlayIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export default function ArticlePage() {
  return (
    <section className="container max-w-[720px]">
      <header className="">
        <h1 className="mb-6 text-4xl text-[32px] font-bold md:mb-8">
          Are You Kind or Are You Just A People Pleaser?
        </h1>
        <div className="mb-5 flex items-center gap-4">
          <div className="">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col text-[14px] font-medium">
            <div className="flex gap-2">
              <h6>Salo B.</h6>
              &middot;
              <button className="text-green-600 hover:cursor-pointer">
                Follow
              </button>
            </div>
            <div className="flex flex-col gap-x-4 text-[14px] font-medium md:flex-row">
              <p>
                Published in <span>ILLUMINATION</span>{" "}
                <span className="hidden md:inline-block">&middot;</span>
              </p>{" "}
              <p className="flex gap-4">
                <span>3 min read</span>&middot; <span>May 8, 2024</span>
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="mb-6 flex items-center justify-between border-b border-t border-gray-200 py-4">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <HeartIcon width={20} height={20} color="gray" />
            <span className="text-[13px] text-gray-500">226</span>
          </div>
          <div className="flex items-center gap-2">
            <ChatBubbleIcon width={20} height={20} color="gray" />
            <span className="text-[13px] text-gray-500">6</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BookmarkIcon
            className="hover:cursor-pointer"
            width={20}
            height={20}
            color="gray"
          />
          <PlayIcon
            className="hover:cursor-pointer"
            width={20}
            height={20}
            color="gray"
          />
          <Share2Icon
            className="hover:cursor-pointer"
            width={20}
            height={20}
            color="gray"
          />
          <DotsHorizontalIcon
            className="hover:cursor-pointer"
            width={20}
            height={20}
            color="gray"
          />
        </div>
      </div>
      <div className="w-full">
        <Image
          width={500}
          height={300}
          src={"/assets/pilaf.png"}
          alt="pilaf"
          className="w-full"
        />
      </div>
    </section>
  );
}
