import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [loading,setLoading]=useState();
  const Provider = new GoogleAuthProvider();
  const SignUpwithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("You Signed Up Successfully!");
       
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error( errorMessage );
      });
  };

  const SignInwithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("You siged in successfully!");
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const SignInwithGoogle = () => {
    return signInWithPopup(auth, Provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        const user = result.user;
        toast.success("You siged in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
      });
  };

 const LogOut=()=>{
  setLoading(true);
  return signOut(auth)
 }


  const [user, setUser] = useState();
  useEffect(() => {
    const Subscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    return () => {
      Subscribe();
    };
  }, []);

  const value = {
    SignUpwithEmailAndPassword,
    SignInwithEmailAndPassword,
    SignInwithGoogle,
    user,
    loading,
     setLoading,
    LogOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
