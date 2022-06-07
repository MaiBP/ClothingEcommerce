import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC_yO3qp7mkQ36Kom-XOgJXsIaArmKAnXw",
  authDomain: "clothing-ecommerce-c753f.firebaseapp.com",
  projectId: "clothing-ecommerce-c753f",
  storageBucket: "clothing-ecommerce-c753f.appspot.com",
  messagingSenderId: "161119931435",
  appId: "1:161119931435:web:c510aaabddfd43856dae6e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid )

    console.log(userDocRef)
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){ //check if user exists
        const { displayName, email } = userAuth;
        const createdAt = new Date();
//if user data does not exist
//create set the document with the data from userAuth in my collection
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(err){
            console.log('error creating the user', err.message)
        }
    }
  //if user data exists
    return userDocRef;

    
    
  

}




