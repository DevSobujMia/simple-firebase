import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import app from "../firebase/firebase.init";

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    console.log(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => {
            console.log('error', error.message);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            setUser(null);

        })
        .catch(error => {
            console.log(error);
        })
    }
    
    return (
        <div>
            {
                user ? 
                <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleGoogleSignIn}>Google Login</button>
            }
            {
                user && <div>
                    <h3>User: {user.displayName}</h3>
                    <p>{user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;