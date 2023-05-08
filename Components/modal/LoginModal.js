import React from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";

function LoginModal() {
  const isOpen = useSelector((state) => state.modals.LoginModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(
      auth,
      "gesture765@yahoo.com",
      "developer777"
    );
  }

  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="bg-transparent text-white border border-white h-[40px] w-[160px] rounded-full hover:bg-[#cbd2d7]"
      >
        Login
      </button>

      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white 
        md:w-[560px] md:h-[600px] flex justify-center
        border border-gray-600 rounded-lg"
        >
          <div className="w-[90%] mt-8 flex flex-col">
            <h1 className="text-center mt-4 font-bold text-4xl">
              Sign in to your account
            </h1>

            <input
              type="email"
              className="h-10 rounded-md bg-transparent border border-gray-700 p-6 mt-8"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="h-10 rounded-md bg-transparent border border-gray-700 p-6 mt-8"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-white text-black w-full 
            font-bold text-lg p-2 mt-8 ronded-md"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <h1 className="text-center font-bold text-lg mt-8">or</h1>
            <button
              className="bg-white text-black w-full 
            font-bold text-lg p-2 mt-8 ronded-md"
              onClick={handleGuestSignIn}
            >
              Sign In as a guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
