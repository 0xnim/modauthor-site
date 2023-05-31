import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react';
import './Login.css';

const Login = () => {
  const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <div className="login-form-container">
        <h2 className="login-heading">Login Page</h2>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <div>
            <h3>Welcome back, <UserButton /></h3>
            <button onClick={() => window.clerk.signOut()}>Sign Out</button>
          </div>
        </SignedIn>
      </div>
    </ClerkProvider>
  );
};

export default Login;