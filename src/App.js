import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { ClerkProvider } from "@clerk/clerk-react";
import './App.css';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <div className="App">
        <SignedIn>
          <Dashboard onLogout={handleLogout} />
        </SignedIn>
        <SignedOut>
          <Login onLogin={handleLogin} />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
};

export default App;