import { captureException } from "@sentry/nextjs";
import * as firebase from "firebase/auth";
import {
  CompleteFn,
  EmailAuthProvider,
  ErrorFn,
  NextOrObserver,
  User,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const auth = firebase.getAuth(firebaseConfig);
export default auth;

export const firebaseSignUpUser = (email: string, password: string) =>
  firebase
    .createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      captureException(error);
      return Promise.reject(error);
    });

export const firebaseSignInUser = (email: string, password: string) =>
  firebase.signInWithEmailAndPassword(auth, email, password).catch((error) => {
    captureException(error);
    return Promise.reject(error);
  });

export const firebaseSignOut = () =>
  auth.signOut().catch((error) => {
    captureException(error);
    return Promise.reject(error);
  });

export const firebaseCheckAuth = (
  nextOrObserver: NextOrObserver<User | null>,
  error?: ErrorFn,
  completed?: CompleteFn
) => auth.onAuthStateChanged(nextOrObserver, error, completed);

export const firebaseUpdateProfile = ({
  photoURL,
  displayName,
}: {
  photoURL?: string;
  displayName?: string;
}) => {
  const user = auth.currentUser;
  if (user) {
    return firebase.updateProfile(user, { photoURL, displayName });
  }
  return Promise.reject();
};

export const firebaseUpdatePassword = (password: string, nPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    return firebaseReauthenticateUser(password)
      .then(() => firebase.updatePassword(user, nPassword))
      .catch((error) => {
        captureException(error);
        return Promise.reject(error);
      });
  }
  return Promise.reject();
};

export const firebaseReauthenticateUser = (password: string) => {
  const user = auth.currentUser;
  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    return firebase
      .reauthenticateWithCredential(user, credential)
      .catch((error) => {
        captureException(error);
        return Promise.reject(error);
      });
  }
  return Promise.reject();
};

export const firebaseSendEmailVerification = () => {
  const user = auth.currentUser;
  if (user) {
    return firebase.sendEmailVerification(user).catch((error) => {
      captureException(error);
      return Promise.reject(error);
    });
  }
  return Promise.reject();
};

export const firebaseSendPasswordResetEmail = (email: string) =>
  firebase.sendPasswordResetEmail(auth, email).catch((error) => {
    captureException(error);
    return Promise.reject(error);
  });
