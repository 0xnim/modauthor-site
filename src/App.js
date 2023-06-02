import React from "react";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { neobrutalism } from '@clerk/themes';
import "./App.css";
import Dashboard from "./components/Dashboard";

const App = () => {
  const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider 
      publishableKey={clerkPublishableKey}
      appearance={{
        baseTheme: neobrutalism
      }}
    >
      <div className="App">
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
};

export default App;