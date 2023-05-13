import React from "react";
import { closeCommentModal } from "@/redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";
import { useRouter } from "next/router";

function CommentModal() {
  const router = useRouter();
  const isOpen = useSelector((state) => state.modals.CommentModalOpen);
  // const userImg = useSelector((state) => state.user.photoUrl);
  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);
  console.log(tweetDetails);

  // Retrieve the user details that is currently logged in
  //to be included it in the comment modal under the tweet selected
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  //useState will update the comment variable based on the value from the textarea (user's input)
  const [comment, setComment] = useState("");

  async function sendComment() {
    const docRef = doc(db, "posts", tweetDetails.id);
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    };
    await updateDoc(docRef, {
      // the comment will be added to firebase as an element in an array
      comments: arrayUnion(commentDetails),
    });

    // close the modal
    dispatch(closeCommentModal());

    // navigate to comment page after sending a comment
    router.push("/" + tweetDetails.id);
  }

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div
          className="relative bg-black rounded-lg border border-gray-500
        w-full h-full sm:w-[600px] sm:h-[386px] sm:p-10 p-4
         text-white"
        >
          <div className="absolute w-[2px] h-[110px] bg-gray-500 ml-6 mt-24 sm:mt-12" />
          <div
            className="absolute cursor-pointer top-4 active:opacity"
            onClick={() => dispatch(closeCommentModal())}
          >
            <XIcon className="w-6" />
          </div>
          <div className="mt-14 sm:mt-8">
            <div className="flex space-x-3 w-full">
              <img
                className="w-12 h-12 object-cover rounded-full z-10"
                src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails.tweet}</p>
                <h1 className="text-gray-500 text-[15px] mt-2">
                  Replying to{" "}
                  <span className="text-[#1b9f0]">
                    @{tweetDetails.username}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 object-cover rounded-full z-10"
                src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
                // sorce should be changed to userImg
              />
              <div className="w-full">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tweet your reply"
                  className="w-full text-lg bg-transparent resize-none outline-none"
                />

                <div className="pt-4 flex justify-between border-t border-gray-700">
                  <div className="flex space-x-0 ">
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
                    disabled={!comment}
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 
                    disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={sendComment}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentModal;
