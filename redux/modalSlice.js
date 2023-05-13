import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SignupModalOpen: false,
  LoginModalOpen: false,
  CommentModalOpen: false,

  commentTweetDetails: {
    id: null,
    tweet: null,
    photoUrl: null,
    name: null,
    username: null,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignupModal: (state) => {
      state.SignupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.SignupModalOpen = false;
    },
    openLoginModal: (state) => {
      state.LoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.LoginModalOpen = false;
    },
    openCommentModal: (state) => {
      state.CommentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.CommentModalOpen = false;
    },

    setCommentTweet: (state, action) => {
      (state.commentTweetDetails.username = action.payload.username),
        (state.commentTweetDetails.name = action.payload.name),
        (state.commentTweetDetails.id = action.payload.id),
        (state.commentTweetDetails.photoUrl = action.payload.photoUrl),
        (state.commentTweetDetails.tweet = action.payload.tweet);
    },
  },
});

export const {
  openSignupModal,
  closeSignupModal,
  openLoginModal,
  closeLoginModal,
  openCommentModal,
  closeCommentModal,
  setCommentTweet,
} = modalSlice.actions;

export default modalSlice.reducer;
