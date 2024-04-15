import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase";
// const auth = getAuth();
const provider = new GoogleAuthProvider();
const signInwithGoogle = () => {
  signInWithRedirect(auth, provider);
};

export { signInwithGoogle };
