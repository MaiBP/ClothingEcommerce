import React, { useEffect } from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component'
// import { getRedirectResult } from 'firebase/auth'
import './authentication.styles.scss'

const Authentication = () => {

  //  useEffect(() => {
  //    return async function response () { //app remounts 
  //        const response = await getRedirectResult(auth); //get me the response from redirect, track information
  //       if (response){
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //    }
  //  }, [])

  


  return (
    <div className='authentication-container'> 
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
}

export default Authentication; 