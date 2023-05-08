import React from "react";
import Sidebar from "@/Components/Sidebar";
import Trending from "@/Components/Trending";
import Tweet from "../Components/Tweet";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Moment from "react-moment";
import Link from "next/link";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data.username,
    name: data.name,
    photoUrl: data.tweet,
    text: data.tweet,
    comments: data.comments || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
  };

  return {
    props: {
      tweetData: formattedData,
    },
  };
}

function CommentPage({ tweetData }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div
        className="flex bg-black min-h-screen
       text-[#E7E9EA] max-w-[1400px] mx-auto "
      >
        <Sidebar />

        <div
          className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow 
      border-gray-700 border-x"
        >
          <div
            className="flex space-x-2 px-3 py-2 text-lg sm:text-xl font-bold
            border-b border-gray-700 sticky top-0 z-50
            "
          >
            <Link href={"/"}>
              <ArrowLeftIcon className="w-7 cursor-pointer" />
            </Link>
            <h1>Tweet</h1>
          </div>
          <div className=" border-gray-700 border-b">
            <div className="flex space-x-3 p-3">
              <img
                src={
                  "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
                }
                className="rounded-full object-cover w-11 h-11"
              />
              <div>
                <div className="text-gray-500 flex items-center space-x-2 mb-1">
                  <h1 className="text-white font-bold">{tweetData.name}</h1>
                  <span>@{tweetData.username}</span>
                  <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>
                <span className="text-2xl">{tweetData.text}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-gray-700 p-2">
            <div className="flex justify-center items-center p-1 space-x-1">
              <img
                src={user.photoUrl}
                className="rounded-full object-cover w-11 h-11"
              />
              <h1 className="text-2xl text-gray-500 ">Tweet your reply</h1>
            </div>
            <button
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5 
            disabled:cursor-not-allowed disabled:opacity-50"
              // onClick={sendTweet}
              disabled={true}
            >
              Tweet
            </button>
          </div>
          {tweetData.comments?.map((comment) => (
            <div className=" border-gray-700 border-b">
              <div className="flex space-x-3 p-3">
                <img
                  src={
                    "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
                  }
                  className="rounded-full object-cover w-11 h-11"
                />
                <div>
                  <div className="text-gray-500 flex items-center space-x-2 mb-1">
                    <h1 className="text-white font-bold">{comment.name}</h1>
                    <span>@{comment.username}</span>
                    <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
                  </div>
                  <span className="text-2xl">{comment.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Trending />
      </div>
    </div>
  );
}

export default CommentPage;
