import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function withAuthProtection (UserHome){
  const [user, setUser] = useState();
  const auth = getAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Check for authentication and redirect if necessary
    if (!user) {
      navigateTo("/");
    }

    return () => {
      authChange();
    };
  }, [auth, navigateTo]); // Add navigateTo as a dependency

  return user ? <UserHome /> : null; // Conditionally render UserHome
};

export default withAuthProtection;