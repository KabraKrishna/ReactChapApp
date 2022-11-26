import { useContext } from "react";
import { AuthenticationContext } from "../context/auth";

export function useAuthentication() {

    const contextValue = useContext(AuthenticationContext);

    if(!contextValue) {

    }

    return contextValue;
}