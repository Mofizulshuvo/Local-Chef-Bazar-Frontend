import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const Provider = new GoogleAuthProvider();
  const SignUpwithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("You Signed Up Successfully!");
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error({ errorMessage });
      });
  };

  const SignInwithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("You siged in successfully!");
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const SignInwithGoogle = () => {
    return signInWithPopup(auth, Provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        toast.success("You siged in successfully!");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        toast.error(errorMessage);
      });
  };

  const value = {
    SignUpwithEmailAndPassword,
    SignInwithEmailAndPassword,
    SignInwithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
