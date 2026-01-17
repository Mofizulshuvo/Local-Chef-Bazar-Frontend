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
import { useNavigate } from "react-router";

const AuthProvider = ({ children }) => {

  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  
  const SignUpwithEmailAndPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("You signed up successfully!");
        return userCredential;
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

 
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

  const [UsersAllDataFromDB, setUserAllDataFromDB] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [token, setToken] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const { data } = await axios.get(
            `https://local-chef-bazar-backend-1.onrender.com/users/${currentUser.uid}`
          );
          setUserAllDataFromDB(data);
          setUserRole(data.role || "user");
        } catch (error) {
          console.log("Error fetching user role:", error.message);
          setUserRole("user");
        }

        const idToken = await currentUser.getIdToken();
        setToken(idToken);
      } else {
        setUserRole("user");
        setToken("");
      }

      setLoading(false);
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
    UsersAllDataFromDB,
    setUserAllDataFromDB,
    userRole,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
