import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    // signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,  //external providers intances created
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth'

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth(); // keeps track of the user authentication in the app. 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); // these providers are from Google
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
    if (!userAuth) return;
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
                createdAt,
                ...additionalInformation, //add info myself overwrites null value 'displayName' 
            })
        }catch(err){
            console.log('error creating the user', err.message)
        }
    }
  //if user data exists
    return userDocRef;


}

export const createAuthUserWithEmailAndPassword = async (email, password) => { //authenticated user
 if(!email || !password) return;
 return await createUserWithEmailAndPassword(auth, email, password) //firebase handles this. 

}

export const signInAuthUserWithEmailAndPassword  = async (email, password) => { //authenticated user
 if(!email || !password) return;
 return await signInWithEmailAndPassword(auth, email, password) //firebase handles this. 

}

//sign out User

export const signOutUser = async () =>  await signOut(auth)

//listener for changes in state // keeps tracks if user is sign in or out 
export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback);