import React, { useEffect } from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
// import { getRedirectResult } from 'firebase/auth'
import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";


const SignIn = () => {

  //  useEffect(() => {
  //    return async function response () { //app remounts 
  //        const response = await getRedirectResult(auth); //get me the response from redirect, track information
  //       if (response){
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //    }
  //  }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
  }


  return (
    <div>
      <h1> Sign In Page </h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignUpForm/>
    </div>
  );
}

export default SignIn; 