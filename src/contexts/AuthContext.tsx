import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface User {
  uid: string;
  email: string;
  name: string;
  role: 'student' | 'mentor' | string;
  createdAt?: Date;
  enrolledCourses?: string[];
  completedCourses?: string[];
  certificates?: string[];
}

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string, name: string, role: 'student' | 'mentor') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, name: string, role: 'student' | 'mentor') => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
        enrolledCourses: [],
        completedCourses: [],
        certificates: []
      });

      setCurrentUser({ uid: user.uid, email: user.email!, name, role, enrolledCourses: [], completedCourses: [], certificates: [] });
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data && 'role' in data) {
          setCurrentUser({
            uid: user.uid,
            email: user.email!,
            name: data.name,
            role: data.role as 'student' | 'mentor',
            enrolledCourses: data.enrolledCourses ?? [],
            completedCourses: data.completedCourses ?? [],
            certificates: data.certificates ?? []
          });
        }
      }

      toast.success('Logged in successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      toast.success('Logged out successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data && 'role' in data) {
            setCurrentUser({
              uid: user.uid,
              email: user.email!,
              name: data.name,
              role: data.role as 'student' | 'mentor',
              enrolledCourses: data.enrolledCourses ?? [],
              completedCourses: data.completedCourses ?? [],
              certificates: data.certificates ?? []
            });
          }
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
