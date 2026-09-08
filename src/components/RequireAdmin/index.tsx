import {
    Navigate,
} from "react-router-dom";

import type {
    ReactNode,
} from "react";

import {
    useAuth,
} from "../../store/AuthContext";


type RequireAdminProps = {
    children: ReactNode;
};


function RequireAdmin({
    children,
}: RequireAdminProps) {

    const { user } = useAuth();


    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    if (user.role !== "admin") {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    return children;
}


export default RequireAdmin;