import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../services/FireBase";
import { doc, setDoc } from "firebase/firestore";

interface User {
  email: string;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children,}: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(
        currentUser ? { email: currentUser.email!, uid: currentUser.uid } : null
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function signUp(email: string,password: string): Promise<UserCredential> {
    setDoc(doc(db, "users", email), {
      favShows: [],
    });
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email: string,password: string ): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logOut(): Promise<void> {
    return signOut(auth);
  }

  const contextValue: AuthContextType = {
    user,
    signUp,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
