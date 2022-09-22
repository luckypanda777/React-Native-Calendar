import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              // await auth().signInWithEmailAndPassword(email, password);
              setUser(true)
            } catch(e) {
              alert(e);
            }
          },

          googleLogin: async () => {
            try {
              const { idToken } = await GoogleSignin.signIn();
              const googleCredential = auth.GoogleAuthProvider.credential(idToken);
              await auth().signInWithCredential(googleCredential);
            } catch(e) {
              alert(e);
            }
          },

          signup: async (email, password) => {
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              alert(e);
            }
          },
          
          logout: async () => {
            try {
              await auth().signOut();
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };