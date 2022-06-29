import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import {createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import "./sign-up-form.styles.scss";
import Button from '../button/button.component'
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',

} //set object to get defaul state



const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

console.log(formFields)

const resetFormFields =() => {
  setFormFields(defaultFormFields)
}

const handleSubmit = async (event) => {
  event.preventDefault();
  //confirm password match, see if authuser, create user document
  if (password !== confirmPassword){
    alert('passwords do not match')
    return;
  }
  try{
 const {user}= await createAuthUserWithEmailAndPassword(
   email, 
   password
   );

  await createUserDocumentFromAuth(user, {displayName});
  resetFormFields() //clear the form fields 

  }catch(error){
    if (error.code === "auth/email-already-in-use"){
      alert('Cannot create user, email already exists')
    } else{
      console.log("user creation encoutered an error", error);
    } 
  }
}
const handleChange = (event)=>{
 const { name, value} = event.target; //takes what's inside input 
 setFormFields({...formFields, [name]: value}) // brings the formfields, takes what's passing in name and set the value. 
}

    return (
      <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            name="displayName"
            onChange={handleChange}
            value={displayName} // value from state is the one is passing in the input
          />

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

          <FormInput
            label="Confirm Password"
            type="password"
            required
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
          />
          <Button buttonType='inverted' type="submit">Sign Up</Button>
        </form>
      </div>
    );
}

export default SignUpForm;