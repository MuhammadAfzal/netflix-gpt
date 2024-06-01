import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import {
  validateLoginFormData,
  validateSignInFormData,
} from "../utils/validate";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: fullName.current.value,
      photoURL: "https://avatars.githubusercontent.com/u/2682366?v=4",
    })
      .then(() => {
        // Profile updated!
        const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const createUser = () => {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value,
      fullName.current.value
    )
      .then((userCredential) => {
        // Signed up
        updateUserProfile();
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signup error", error);
        setErrorMessage(`${error.code} - ${error.message}`);
        // ..
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signin error", error);
        setErrorMessage(`${error.code} - ${error.message}`);
      });
  };

  const handleButtonClick = () => {
    const errorMessage = isSignInForm
      ? validateLoginFormData(email.current.value, password.current.value)
      : validateSignInFormData(
          email.current.value,
          password.current.value,
          fullName.current.value
        );
    setErrorMessage(errorMessage);

    if (errorMessage) return;

    if (!isSignInForm) {
      // signup
      createUser();
    } else {
      // sign in
      signIn();
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="
        https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/3017e280-c734-4bc9-9cf3-2cdd363644e5/PK-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_51bbfc4d-6750-49fc-98f1-802c382dbd2c_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 right-0 left-0 mx-auto bg-opacity-80 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}
        <button
          onClick={handleButtonClick}
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
