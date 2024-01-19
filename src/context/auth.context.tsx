import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../configFirebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  userIqbal: { [index: string]: string | null } | undefined;
};

type User = {
  userIqbal: { [index: string]: string | null };
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userIqbal, setUser] = useState<User | null>({} as User);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        let userValid = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        const users = { userIqbal: userValid };
        setUser(users);
      }
      navigate("/");
      toast.success("Login succesfuly ");
    } catch (err) {
      console.log(err);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      toast.error("Logout succesfuly");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      const user = userData;
      if (user) {
        const userValid = {
          displayName: user.displayName,
          email: user?.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        const users = { userIqbal: userValid };
        setUser(users);
      } else {
        console.log("belum login");
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut: signOutUser, userIqbal: userIqbal?.userIqbal }}
    >
      {children}
    </AuthContext.Provider>
  );
};
