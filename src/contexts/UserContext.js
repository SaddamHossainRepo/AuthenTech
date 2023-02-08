import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from './../firebase/firebase.init';
import { updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

const auth = getAuth(app)
export const AuthContext = createContext()

const UserContext = ({children}) => {
    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState({})

    // 1. create user
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // 2. update name
    const updateName = (name) =>{
        return updateProfile(auth.currentUser, {displayName: name})
    }
    // 3. email verify
    const verifyEmail = () =>{
        return sendEmailVerification(auth.currentUser)
    }

    // 4. google sign in
    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    // 5. sign out
    const logout = () =>{
        return signOut(auth)
    }

    const userInfo = {
        user,
        createUser,
        updateName,
        verifyEmail,
        signInWithGoogle,
        logout,
    }

    useEffect(() =>{
        // eta run hobe jokhn component MOUNT hobe
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
        })

        return () =>{
        // eta run hobe jokhn component UNMOUNT hobe
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={userInfo}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>
    );
};

export default UserContext;