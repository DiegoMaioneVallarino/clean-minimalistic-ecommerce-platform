import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

import defaultAvatar from "../img/user/default-avatar.jpg";


export type UserSettings = {
    orderUpdates: boolean;
    promotions: boolean;
};


export type User = {
    name: string;
    email: string;
    avatar: string;

    balance: number;

    role:
        | "user"
        | "admin";

    settings: UserSettings;
};


type UpdateProfileData = {
    name: string;
    email: string;
};


type AuthContextType = {

    user: User | null;

    login: (
        email: string,
        password: string
    ) => boolean;

    register: (
        name: string,
        email: string,
        password: string
    ) => boolean;

    logout: () => void;

    addBalance: (
        amount: number
    ) => void;

    updateProfile: (
        data: UpdateProfileData
    ) => void;

    updateSettings: (
        settings: UserSettings
    ) => void;
};


const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );


type AuthProviderProps = {
    children: ReactNode;
};


export function AuthProvider({
    children
}: AuthProviderProps) {

    const [user, setUser] =
        useState<User | null>(
            null
        );


    function login(
        email: string,
        password: string
    ): boolean {

        if (
            email === "test@test.com" &&
            password === "123456"
        ) {

            setUser({
                name: "Test User",

                email,

                avatar:
                    defaultAvatar,

                balance: 2500,

                role: "admin",

                settings: {
                    orderUpdates: true,
                    promotions: false,
                },
            });

            return true;
        }


        return false;
    }


    function register(
        name: string,
        email: string,
        password: string
    ): boolean {

        if (
            !name ||
            !email ||
            !password
        ) {
            return false;
        }


        setUser({
            name,

            email,

            avatar:
                defaultAvatar,

            balance: 0,

            role: "user",

            settings: {
                orderUpdates: true,
                promotions: false,
            },
        });


        return true;
    }


    function logout() {

        setUser(null);

    }


    function addBalance(
        amount: number
    ) {

        if (amount <= 0) {
            return;
        }


        setUser(
            (currentUser) => {

                if (!currentUser) {
                    return null;
                }


                return {
                    ...currentUser,

                    balance:
                        currentUser.balance +
                        amount,
                };

            }
        );
    }


    function updateProfile(
        data: UpdateProfileData
    ) {

        setUser(
            (currentUser) => {

                if (!currentUser) {
                    return null;
                }


                return {
                    ...currentUser,

                    name:
                        data.name,

                    email:
                        data.email,
                };

            }
        );
    }


    function updateSettings(
        settings: UserSettings
    ) {

        setUser(
            (currentUser) => {

                if (!currentUser) {
                    return null;
                }


                return {
                    ...currentUser,

                    settings,
                };

            }
        );
    }


    return (
        <AuthContext.Provider
            value={{
                user,

                login,
                register,
                logout,

                addBalance,

                updateProfile,
                updateSettings,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}


export function useAuth() {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    }


    return context;
}