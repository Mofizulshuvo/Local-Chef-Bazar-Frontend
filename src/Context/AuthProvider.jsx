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
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  // Sign up with email & password
  const SignUpwithEmailAndPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("You signed up successfully!");
        return userCredential; // return to get UID
        
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // Sign in with email & password
  const SignInwithEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("You signed in successfully!");
        return userCredential;
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // Sign in with Google
  const SignInwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        toast.success("You signed in successfully!");
        return user;
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // Logout
  const LogOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // Track auth state
  const [userRole,setUserRole]=useState("user");
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/users/${currentUser.uid}`
        );
        setUserRole(data.role || "user");
      } catch (error) {
        console.log("Error fetching user role:", error.message);
        setUserRole("user");
      }
    } else {
      setUserRole("user");
    }
  });

  return () => unsubscribe();
}, []);


  const value = {
    user,
    loading,
    setLoading,
    SignUpwithEmailAndPassword,
    SignInwithEmailAndPassword,
    SignInwithGoogle,
    LogOut,
    userRole,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
