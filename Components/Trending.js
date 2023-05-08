import { DotsCircleHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import React from "react";

function Trending() {
  return (
    <div className="hidden lg:flex flex-col ml-7 mt-4">
      <div className="flex space-x-3 bg-white bg-opacity-10 w-[300px] h-[44px] p-3 rounded-3xl">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent focus:outline-none text-gray-600"
          placeholder="Search Twiiter"
        ></input>
      </div>
      <div className="w-[300px] h-[500px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's happening</h1>
        <div className="p-3 relative">
          <DotsCircleHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">Elections</h1>
          <p className="text-xs text-gray-500">20k Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsCircleHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Politics</p>
          <h1 className="text-[15px] font-bold">Jerome Powell</h1>
          <p className="text-xs text-gray-500">3k Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsCircleHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Sport</p>
          <h1 className="text-[15px] font-bold">#Arsenal</h1>
          <p className="text-xs text-gray-500">40k Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsCircleHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">Microsoft</h1>
          <p className="text-xs text-gray-500">93k Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsCircleHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">#tiktok</h1>
          <p className="text-xs text-gray-500">10k Tweets</p>
        </div>
      </div>
      <div className="w-[300px] h-[300px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who to follow</h1>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src={
                "https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg"
              }
            ></img>
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Bill Gates</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@BillGates</h1>
            </div>
          </div>

          <button className="bg-white text-black text-sm w-20 h-8 rounded-full font-bold">
            Follow
          </button>
        </div>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src={
                "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg"
              }
            ></img>
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Mr Beast</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@MrBeast</h1>
            </div>
          </div>

          <button className="bg-white text-black text-sm w-20 h-8 rounded-full font-bold">
            Follow
          </button>
        </div>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src={
                "https://pbs.twimg.com/profile_images/1468001914302390278/B_Xv_8gu_400x400.jpg"
              }
            ></img>
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold text-xs">Marques Brownlee</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@MKBHD</h1>
            </div>
          </div>

          <button className="bg-white text-black text-sm w-20 h-8 rounded-full font-bold">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default Trending;
