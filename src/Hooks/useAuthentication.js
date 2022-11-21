import { useContext } from "react";
import { AuthenticationContext } from "../context/auth";

export function useAuthentication() {

    const contextValue = useContext(AuthenticationContext);

    if(!contextValue) {

        console.log("No value...!");
    }

    return contextValue;
}