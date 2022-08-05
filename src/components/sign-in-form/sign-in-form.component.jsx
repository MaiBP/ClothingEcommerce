import { useState } from "react";
import FormInput from '../form-input/form-input.component'


import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '', 

} //set object to get defaul state



const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

// console.log(formFields)


const resetFormFields =() => {
  setFormFields(defaultFormFields)
}

const signInWithGoogle = async () => {
 await signInWithGooglePopup();

};

const handleSubmit = async (event) => {
  event.preventDefault();

  try{
   const {user}= await signInAuthUserWithEmailAndPassword(email, password);
    
  //  console.log(user) 

  resetFormFields() //clear the form fields 

 }catch(error){
   console.log(error)
   switch (error.code) {
     case "auth/wrong-password":
       alert("incorrect password for email");
       break;
     case "auth/user-not-found":
       alert("not user associated with this email");
       break;
       default:
         console.log(error)
   }
  //  if(error.code === 'auth/wrong-password'){
  //    alert('incorrect password for email')
  //  }
  //  if (error.code === "auth/user-not-found") {
  //    alert("sign up to access");
  //  }

 }
}

const handleChange = (event)=>{
 const { name, value} = event.target; //takes what's inside input 
 setFormFields({...formFields, [name]: value}) // brings the formfields, takes what's passing in name and set the value. 
}

    return (
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            name="email"
            onChange={handleChange}
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            name="password"
            onChange={handleChange}
            value={password}
          />
          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button
              type='submit'
              buttonType={BUTTON_TYPE_CLASSES.google}
              onClick={signInWithGoogle}
            >
              Google sign in
            </Button>
          </div>
        </form>
      </div>
    );
}

export default SignInForm;