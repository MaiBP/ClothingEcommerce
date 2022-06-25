import { useState } from 'react'
import {createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

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
    if (error.code == "auth/email-already-in-use"){
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
      <div>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={handleSubmit}>
          <laber> Name</laber>
          <input
            type="text"
            required
            name="displayName"
            onChange={handleChange}
            value={displayName} // value from state is the one is passing in the input
          />

          <laber> Email</laber>
          <input
            type="email"
            required
            name="email"
            onChange={handleChange}
            value={email}
          />

          <laber> Password</laber>
          <input
            type="password"
            required
            name="password"
            onChange={handleChange}
            value={password}
          />

          <laber> Confirm password</laber>
          <input
            type="password"
            required
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
}

export default SignUpForm;