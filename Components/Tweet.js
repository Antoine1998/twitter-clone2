import {
  openCommentModal,
  openLoginModal,
  setCommentTweet,
} from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDoc,
  onSnapshot,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

function Tweet({ data, id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  {
    /* deleting a tweet */
  }
  async function deleteTweet(e) {
    e.stopPropagation();
    await deleteDoc(doc(db, "posts", id));
  }

  async function likeComment(e) {
    e.stopPropagation();
    // open login modal if not user logged in
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }
  // Unlike a tweet
  useEffect(() => {
    // To solve undefined id error
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comments);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {data && (
        <div
          //path to the tweet comment page
          onClick={() => router.push("/" + id)}
          className=" border-gray-700 border-b cursor-pointer"
        >
          <TweetHeader
            username={data.username}
            name={data.name}
            timestamp={data.timestamp?.toDate()}
            text={data.tweet}
            image={data.image}
          />
          <div className="text-gray-500 p-3 ml-16 flex space-x-14">
            <div
              className="flex items-center justify-center space-x-1"
              onClick={(e) => {
                e.stopPropagation();
                if (!user.username) {
                  dispatch(openLoginModal());
                  return;
                }
                dispatch(
                  setCommentTweet({
                    id: id,
                    tweet: data.tweet,
                    photoUrl: data?.photoUrl,
                    name: data?.name,
                    username: data?.username,
                  })
                );
                dispatch(openCommentModal());
              }}
            >
              <ChatIcon className="w-5 h-5 cursor-pointer hover:text-green-400" />
              {comments?.length > 0 && <span>{comments.length}</span>}
            </div>
            <div
              on
              onClick={likeComment}
              className="flex items-center justify-center space-x-1 "
            >
              {likes.includes(user.uid) ? (
                <FilledHeart className="text-pink-500 w-5 cursor-pointer" />
              ) : (
                <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
              )}
              {likes.length > 0 && <span>{likes.length}</span>}
            </div>
            {/* deleting a tweet button*/}
            {user.uid === data?.uid && (
              <div
                className="cursor-pointer hover:text-red-700 active:scale-110"
                onClick={deleteTweet}
              >
                <TrashIcon className="w-5" />
              </div>
            )}
            <ChartBarIcon className="w-5 h-5 cursor-not-allowed" />
            <UploadIcon className="w-5 h-5 cursor-not-allowed" />
          </div>
        </div>
      )}
    </>
  );
}

function TweetHeader({ username, name, timestamp, text, image }) {
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
        {image && (
          <img
            className="object-cover rounded-md mt-3 max-h-80 border border-gray-700"
            src={image}
          />
        )}
      </div>
    </div>
  );
}

export default Tweet;
