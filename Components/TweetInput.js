import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useSelector } from "react-redux";

function TweetInput() {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user);

  async function sendTweet() {
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });
    setText(""); //Resest the text editor after sending the tweet to firebase
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        src={
          "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
        }
        className="rounded-full object-cover w-11 h-11"
      />
      <div className="w-full">
        <textarea
          placeholder="What's on your mind?"
          className="bg-transparent resize-none 
          outline-none w-full min-h-[50px] text-lg"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="flex justify-between border-t border-gray-700 pt-4">
          {/* Icons Div */}
          <div className="flex space-x-0">
            <div className="iconAnimation">
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimation">
              <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimation">
              <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimation">
              <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimation">
              <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
          </div>
          <button
            className="bg-[#1d9bf0] rounded-full px-4 py-1.5 
            disabled:cursor-not-allowed disabled:opacity-50"
            onClick={sendTweet}
            disabled={!text}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default TweetInput;
