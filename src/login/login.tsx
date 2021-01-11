import React ,{useState,useRef,useEffect,useCallback, createRef, FormEvent} from "react";
import update from 'immutability-helper';

import "./login.scss";

interface Props{
    onLogin: (username: string, password: string) => void;
    errorFromParent: string;
}

export default function Login({errorFromParent, onLogin}: Props){
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [localError, setLocalError] = useState("");

    //! ist dafür da, damit TYPESCRIPT weiß, das es sich um ein Objekt handelt --> also könnte undefined sein
    useEffect(() => {
        username.current!.focus();
    });

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let error = "Bitte Benutzernamen und Passwort eingeben!";
        if(username.current!.value && password.current!.value){
            error = "";
            onLogin(
                username.current!.value,
                password.current!.value
            );
        }
        setLocalError(prevState => update(prevState, {$set: error}));
    }, []);
        return(
            <form onSubmit={handleSubmit} className ="login">
                {(errorFromParent !== "" || localError !== "") && (
                    <div className="error">
                        {errorFromParent} {localError}
                    </div>
                )}
                <div>
                    <label htmlFor="">Benutzername:</label>
                    <input type="text" id="username" ref={username} />
                </div>
                <div>
                    <label htmlFor="">Passwort:</label>
                    <input type="password" id="password" ref={password} />
                </div>
                <button type="submit">anmelden</button>
            </form>
        );
}