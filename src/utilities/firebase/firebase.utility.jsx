import { initializeApp } from 'firebase/app';

import { 
  doc, 
  getDoc, 
  setDoc, 
  getFirestore,
  collection,
  writeBatch,
  getDocs, 
  query,
} from 'firebase/firestore';

import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyCo--dA431nR_bpCbvgm3nQ6m_0k1M2aWk",
  
    authDomain: "e-commerce-site-db-c3700.firebaseapp.com",
  
    projectId: "e-commerce-site-db-c3700",
  
    storageBucket: "e-commerce-site-db-c3700.appspot.com",
  
    messagingSenderId: "771937432272",
  
    appId: "1:771937432272:web:109d89b373bce155cf24d5"
  
  };
  
  const app = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt :'select_account',
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = ()=> signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=> {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
  };

  export const getCategoriesAndDocuments = async ()=>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()]= items;
      return acc;
    },{});
    return categoryMap;
  }

  export const createUserDocumentFromUserAuth = async (user, additionalInformation = {}) => {
    const UserDocRef = doc(db, 'users', user.uid);
  
    const UserSnapshot = await getDoc(UserDocRef);
  
    if (!UserSnapshot.exists()) {
      const { email } = user;
      const createdAt = new Date();
  
      try {
        await setDoc(UserDocRef, {
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log("Error")
      }
    }
    return UserDocRef;
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const SignInAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth, callback);