import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext } from 'react';
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createUser =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    };
    const signIn =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut =()=>{
        return signOut(auth)
    }
    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth,currentUser =>{
        setUser(currentUser);
        setLoading(false);
       if(currentUser.email){
        const loggedUser = {
            email:currentUser.email
        }
        fetch('https://car-doctor-server-nu-five.vercel.app/jwt',{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(loggedUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            localStorage.setItem('car-token',data.token);
        })
       }
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    const authInfo ={
        createUser,
        user,
        signIn,
        loading,
        logOut
    }
    return (
        <AuthContext.Provider  value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;