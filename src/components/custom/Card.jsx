import Image from "next/image";
import React from "react";
import avatar1 from "../../../public/assets/ava.jpg";
import image from "../../../public/assets/setup.jpg";
import like from "../../../public/assets/like.svg";
import comment from "../../../public/assets/comment.svg";
import { BookmarkIcon, ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
export default function Card({ avatar, userName, title, content, img }) {
  return (
    <div className="base-container mt-12">
      {/* user img, name, icon */}
      <div className="flex items-center">
        <Image className="rounded-full" src={avatar1} alt="img" width={32} />
        <p className="text-slate-600">Al Annay</p>
          </div>
          {/* content, image */}
          <div className="flex items-center gap-24">
          {/* title, textcontent */}
              
      <div className="mt-6 flex flex-col text-start">
        <h1 className="text-3xl font-bold">
          Lorem ipsum dolor sit amet consectetur.
        </h1>
        <p className="mt-2 text-slate-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum,
          laudantium? Sit, culpa.
        </p>
        <div className="mt-6 flex max-w-[300px] items-center  gap-6">
          <p className="text-slate-500">Apr 12</p>
                      {/* <Image className="rounded-full" src={like} alt="img" width={24} /> */}
                      <ChatBubbleIcon />
                      <HeartIcon />
                      <BookmarkIcon/>
          {/* <Image className="rounded-full" src={comment} alt="img" width={24} /> */}
        </div>
          </div>
          {/* card img */}
              <div className="">
              <Image className="" src={image} alt="img" width={200} />

              </div>
          </div>
              
    </div>
  );
}
