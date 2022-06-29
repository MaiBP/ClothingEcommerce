import { createContext, useState } from  'react'

// the actual value to access
export const UserContext = createContext({
currentUser: null,
setCurrentUser: () => null,
})

//provider, recieved value
export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}