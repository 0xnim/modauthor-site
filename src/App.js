import React from "react";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { neobrutalism } from '@clerk/themes';
import "./App.css";
import Dashboard from "./components/Dashboard";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="dark"
    />
    <ClerkProvider 
      publishableKey={clerkPublishableKey}
      appearance={
        {
          "variables": {
           "colorPrimary": "#DF1B1B",
           "colorTextSecondary": "#000",
           "fontWeight": {
            "normal": 400,
            "medium": 600,
            "bold": 700
           }
          },
          "layout": {
           "socialButtonsVariant": "iconButton"
          },
          "elements": {
           "card": {
            "boxShadow": "7px 7px 0px #000",
            "border": "3px solid #000"
           },
           "headerTitle": {
            "fontSize": "24px"
           },
           "headerSubtitle": {
            "fontSize": "0.8125rem",
            "fontWeight": 600
           },
           "socialButtonsIconButton": {
            "height": "2.5rem",
            "boxShadow": "3px 3px 0px #000",
            "borderRadius": "0.5rem",
            "border": "2px solid #000",
            "&:focus": {
             "boxShadow": "4px 4px 0px #000",
             "border": "2px solid #000",
             "transform": "scale(1.01)"
            },
            "&:active": {
             "boxShadow": "2px 2px 0px #000",
             "transform": "translate(1px)"
            }
           },
           "dividerLine": {
            "background": "#000"
           },
           "formFieldInput": {
            "boxShadow": "3px 3px 0px #000",
            "border": "2px solid #000",
            "transition": "all 0.2s ease-in-out",
            "padding": "0.6175rem 1rem",
            "&:focus": {
             "boxShadow": "4px 4px 0px #000",
             "border": "2px solid #000",
             "transform": "scale(1.01)"
            }
           },
           "formButtonPrimary": {
            "height": "2.5rem",
            "border": "2px solid #000",
            "boxShadow": "3px 3px 0px #000"
           },
           "footer": {
            "& + div": {
             "border": "2px solid #000",
             "boxShadow": "-4px 1px 0 0 #000"
            }
           },
           "footerActionLink": {
            "fontWeight": 600,
            "borderBottom": "2px solid",
            "borderColor": "#DF1B1B",
            "&:focus": {
             "boxShadow": "none"
            },
            "&:hover": {
             "textDecorationLine": "none"
            }
           },
           "footerActionText": {
            "fontWeight": 600
           },
           "logoImage": {
            "filter": "hue-rotate(140deg)"
           }
          }
         }
      }>
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
