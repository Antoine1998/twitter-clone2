import React from "react";
import Modal from "@mui/material/Modal";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

function SignUpModal() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const isOpen = useSelector((state) => state.modals.SignupModalOpen);
  const dispatch = useDispatch();

  //Checks if the user is signed in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });
    return unsubscribe;
  }, []);

  async function handleSignUp() {
    const userCredintials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/elon_image.jpg`,
    });

    router.reload();
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
        onClick={() => dispatch(openSignupModal())}
        className="bg-white text-black h-[40px] w-[160px] rounded-full 
        hover:bg-[#cbd2d7]"
      >
        Sign up
      </button>

      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white 
        md:w-[560px] md:h-[600px] flex justify-center
        border border-gray-600 rounded-lg"
        >
          <div className="w-[90%] mt-8 flex flex-col">
            <button
              className="bg-white text-black w-full 
            font-bold text-lg p-2 ronded-md"
              onClick={handleGuestSignIn}
            >
              Sign In as a guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="text-center mt-4 font-bold text-4xl">
              Create yout Account
            </h1>
            <input
              type="text"
              className="h-10 rounded-md bg-transparent border border-gray-700 p-6 mt-8"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
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
              className="bg-white text-black w-full font-bold text-lg p-2 mt-8 ronded-md"
              onClick={handleSignUp}
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SignUpModal;
