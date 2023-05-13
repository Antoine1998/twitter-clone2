import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { db, storage } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";

function TweetInput() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const filePickerRef = useRef(null);
  const user = useSelector((state) => state.user);

  async function sendTweet() {

    if(!user.username) {
      dispatch(openLoginModal())
      return
    }

    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    if (image) {
      //adding image refernce in firebase storage
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);
      console.log(imageRef);
      const uploadImage = await uploadString(imageRef, image, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      //add the image refrence to the tweet component in firebase
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    }

    setText(""); //Resest the text editor after sending the tweet to firebase
    setImage(null);
    setLoading(false);
  }

  // Display images selected
  function addImagetoTweet(e) {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        src={
          user.photoUrl ||
          "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
        }
        className="rounded-full object-cover w-11 h-11"
      />
      {loading && <h1 className="text-2xl text-gray-500">Uploading post...</h1>}
      {!loading && (
        <div className="w-full">
          <textarea
            placeholder="What's on your mind?"
            className="bg-transparent resize-none 
          outline-none w-full min-h-[50px] text-lg"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          {image && (
            <div className="relative mb-4">
              <div
                className="absolute top-1 left-1 bg-[#272c26] rounded-full w-8 h-8 
            flex justify-center items-center cursor-pointer hover:bg-transparent 
            hover:border-2 hover:border-[#272c26] active:-scale-90"
                onClick={() => setImage(null)}
              >
                <XIcon className="h-5 " />
              </div>
              <img
                className="rounded-2xl max-h-80 object-contain"
                src={image}
              />
            </div>
          )}
          <div className="flex justify-between border-t border-gray-700 pt-4">
            {/* Icons Div */}
            <div className="flex space-x-0">
              <div
                className="iconAnimation"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <input
                ref={filePickerRef}
                onChange={addImagetoTweet}
                className="hidden"
                type="file"
              />
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
              disabled={!text && !image}
            >
              Tweet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TweetInput;
