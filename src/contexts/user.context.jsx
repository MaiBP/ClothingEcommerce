import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";
// the actual value to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

//** USE REDUCER **//

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer  = (state, action) =>{
  // console.log('dispatch');
  // console.log(action);
  const { type, payload} = action;

switch(type){
  case USER_ACTION_TYPES.SET_CURRENT_USER:
    return{
      ...state,
      currentUser: payload
    }
  default:
    throw new Error(`Unhandled type ${type} in userReducer`)
}
}
const INITIAL_STATE = {
  currentUser: null
}

//provider, recieved value
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser },  dispatch] = useReducer(userReducer, INITIAL_STATE);
  // console.log(currentUser)
  const setCurrentUser = (user) => {

    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user))
  }

  const value = { currentUser, setCurrentUser };

  // signOutUser()
  //when initialize it'll check autentication state automatically
  //
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      //runs callback whenever auth state changes
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      //    console.log(user)
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};





//** USING CONTEXT WITHOUT REDUCER**//

// import { createContext, useState, useEffect} from  'react'
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// //   signOutUser,
// } from "../utils/firebase/firebase.utils";

// // the actual value to access
// export const UserContext = createContext({
// setCurrentUser: () => null,
// currentUser: null,

// })

// //provider, recieved value
// export const UserProvider = ({children}) =>{
//     const [currentUser, setCurrentUser] = useState(null);
//     const value = { currentUser, setCurrentUser}

//     // signOutUser()
// //when initialize it'll check autentication state automatically
// //
//     useEffect(() => {
//         const unsubscribe = onAuthStateChangedListener((user)=>{ //runs callback whenever auth state changes
//           if (user){
//             createUserDocumentFromAuth(user);
//           }
//             setCurrentUser(user);
//         //    console.log(user)
//         })
//         return unsubscribe
//     },[])

//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>

// }