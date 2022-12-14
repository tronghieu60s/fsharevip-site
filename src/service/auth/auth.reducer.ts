import { atom, selector } from 'recoil';
import { getAuth, setAuth } from '../../core/storage';
import { UserType } from '../user/user.types';
import { SignInType } from './auth.types';

export const authStateAtom = atom<SignInType>({
  key: 'authStateAtom',
  default: getAuth(),
});

export const authState = selector<SignInType>({
  key: 'authState',
  get: ({ get }) => get(authStateAtom),
  set: ({ set }, newValue) => {
    set(authStateAtom, newValue);
    setAuth(newValue);
  },
});

export const accessUserState = selector<UserType>({
  key: 'accessUserState',
  get: ({ get }) => get(authStateAtom)?.user,
});

export const accessTokenState = selector<string>({
  key: 'accessTokenState',
  get: ({ get }) => get(authStateAtom)?.accessToken,
});