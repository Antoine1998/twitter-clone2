import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { SignOutUser } from "@/redux/userSlice";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  async function handleSignOut() {
    dispatch(SignOutUser());
    dispatch(closeSignupModal());
    dispatch(closeLoginModal());
    await signOut(auth);
  }

  return (
    <div className="h-full hidden sm:flex flex-col fixed xl:ml-24">
      <nav className="h-full relative xl:space-y-1.5">
        <div className="flex justify-center items-center xl:justify-start py-3 xl:p-3">
          <Image
            src={
              user.photoURL ||
              "https://img.freepik.com/free-icon/twitter_318-674515.jpg"
            }
            width={34}
            height={34}
          />
        </div>
        <SidebarLink Icon={HomeIcon} text={"Home"} />
        <SidebarLink Icon={HashtagIcon} text={"Explore"} />
        <SidebarLink Icon={BellIcon} text={"Notification"} />
        <SidebarLink Icon={InboxIcon} text={"Messages"} />
        <SidebarLink Icon={BookmarkIcon} text={"Bookmark"} />
        <SidebarLink Icon={UserIcon} text={"Profile"} />
        <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
        <button className="hidden xl:inline bg-[#1d9bf0] rounded-full h-[52px] w-[200px] text-lg font-bold mt-2">
          Tweet
        </button>

        <div
          onClick={handleSignOut}
          className="
        absolute bottom-0 flex justify-center items-center xl:p-3 space-x-3
        hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-full"
        >
          <img
            className="w-10 h-10 rounded-full object-cover sm:ml-3 sm:mb-3"
            src="https://i.pinimg.com/736x/aa/c6/a1/aac6a12fd48d80fe1c1d7e4f87505589.jpg"
          />
          <div className="hidden xl:inline">
            <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <DotsCircleHorizontalIcon className="h-5 hidden xl:inline" />
        </div>
      </nav>
    </div>
  );
}

function SidebarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation xl:justify-start justify-center items-center text-xl flex mb-3 space-x-3">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}

export default Sidebar;
