import { useState } from 'react'

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


const handleChange = (event)=>{
 const { name, value} = event.target; //takes what's inside input 
 setFormFields({...formFields, [name]: value}) // brings the formfields, takes what's passing in name and set the value. 
}

    return (
      <div>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={() => {}}>
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