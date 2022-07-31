import { createContext, useState, useEffect} from  'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
//   signOutUser,
} from "../utils/firebase/firebase.utils";

// the actual value to access
export const UserContext = createContext({
setCurrentUser: () => null,
currentUser: null,

})

//provider, recieved value
export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser}

    // signOutUser()
//when initialize it'll check autentication state automatically
//
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=>{ //runs callback whenever auth state changes
          if (user){
            createUserDocumentFromAuth(user);
          }
            setCurrentUser(user);
        //    console.log(user)
        })
        return unsubscribe
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}