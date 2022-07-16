import React, { useContext, useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import UserDataForm from "../components/userDataForm";
import { auth, db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
// import { uid } from 'uid';
import { set, ref, onValue } from "firebase/database";

export default function Home() {
    const navigate = useNavigate();
    const [ datasUser, setDatasUser] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                onValue(ref(db, `users/${auth.currentUser.uid}`), snapshot => {
                    setDatasUser([]);
                    const data = snapshot.val();
                    if(data !== null) {
                        Object.values(data).map(datasUser => {
                            setDatasUser((oldArray) => [...oldArray, datasUser]);

                            console.log(datasUser);
                        })
                    }
                })
            } else if(!user) {
                navigate(("/login"));
            }
        });
    }, []);

    console.log(datasUser);

    if (datasUser[0]) {
        return (
            <div>
                <h1>HOME PAGE</h1>
            </div>
        );
    } else {
        return (
            <div>
                <UserDataForm/>
            </div>
        );
    }   
};