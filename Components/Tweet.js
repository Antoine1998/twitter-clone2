import { openCommentModal, setCommentTweet } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

function Tweet({ data, id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [comments, setComments] = useState([]);


  return (
    <div
      //path to the tweet comment page
      onClick={() => router.push("/" + id)}
      className=" border-gray-700 border-b cursor-pointer"
    >
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
      />
      <div className="text-gray-500 p-3 ml-16 flex space-x-14">
        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              setCommentTweet({
                id: id,
                tweet: data?.tweet,
                photoUrl: data?.photoUrl,
                name: data?.name,
                username: data?.username,
              })
            );
            dispatch(openCommentModal());
          }}
        >
          <ChatIcon className="w-5 h-5 cursor-pointer hover:text-green-400" />
        </div>

        <HeartIcon className="w-5 h-5 cursor-pointer hover:text-pink-500" />
        <ChartBarIcon className="w-5 h-5 cursor-not-allowed" />
        <UploadIcon className="w-5 h-5 cursor-not-allowed" />
      </div>
    </div>
  );
}

function TweetHeader({ username, name, timestamp, text }) {
  return (
    <div className="flex space-x-3 p-3">
      <img
        src={
          "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
        }
        className="rounded-full object-cover w-11 h-11"
      />
      <div>
        <div className="text-gray-500 flex items-center space-x-2 mb-1">
          <h1 className="text-white font-bold">{name}</h1>
          <span>@{username}</span>
          <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
          <Moment fromNow>{timestamp}</Moment>
        </div>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Tweet;
