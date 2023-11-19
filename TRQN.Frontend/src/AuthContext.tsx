import { createContext } from "react";

interface IAuth{
    isAdmin: null | boolean,
    setIsAdmin: Function
}

export const AuthContext = createContext<IAuth>({
    isAdmin: null,
    setIsAdmin: (auth: boolean) => {}
});