
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { useAuth } from "./AuthContext";

import type {
    NewProductRequest,
    ProductRequest,
    ProductRequestStatus,
} from "../types/ProductRequest";

const STORAGE_KEY = "maison.productRequests.v1";

type RequestUpdate = {
    status: ProductRequestStatus;
    adminResponse: string;
    suggestedProductUrl: string;
};

type ContextValue = {
    requests: ProductRequest[];
    myRequests: ProductRequest[];
    submitRequest: (data: NewProductRequest) => boolean;
    updateRequest: (id: string, data: RequestUpdate) => void;
};

const Context = createContext<ContextValue | null>(null);

function readRequests(): ProductRequest[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        const parsed: unknown = JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed as ProductRequest[]
            : [];
    } catch {
        return [];
    }
}

export function ProductRequestsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { user } = useAuth();

    const [requests, setRequests] = useState<ProductRequest[]>(
        readRequests
    );

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(requests)
            );
        } catch (error) {
            console.error("Could not save product requests", error);
        }
    }, [requests]);

    const myRequests = useMemo(() => {
        if (!user) return [];

        return requests
            .filter(
                (request) =>
                    request.customerEmail ===
                    user.email.trim().toLowerCase()
            )
            .sort((a, b) => b.createdAt - a.createdAt);
    }, [requests, user?.email]);

    function submitRequest(data: NewProductRequest) {
        if (!user) return false;

        if (
            !data.title.trim() ||
            !data.description.trim() ||
            data.images.length > 3
        ) {
            return false;
        }

        const now = Date.now();

        const request: ProductRequest = {
            id: crypto.randomUUID(),
            customerEmail: user.email.trim().toLowerCase(),
            customerName: user.name,
            title: data.title.trim(),
            description: data.description.trim(),
            size: data.size.trim(),
            budget: data.budget,
            images: data.images,
            status: "pending",
            adminResponse: "",
            suggestedProductUrl: "",
            createdAt: now,
            updatedAt: now,
        };

        setRequests((current) => [request, ...current]);
        return true;
    }

    function updateRequest(
        id: string,
        data: RequestUpdate
    ) {
        if (user?.role !== "admin") return;

        setRequests((current) =>
            current.map((request) =>
                request.id === id
                    ? {
                        ...request,
                        ...data,
                        updatedAt: Date.now(),
                    }
                    : request
            )
        );
    }

    return (
        <Context.Provider
            value={{
                requests,
                myRequests,
                submitRequest,
                updateRequest,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export function useProductRequests() {
    const context = useContext(Context);

    if (!context) {
        throw new Error(
            "useProductRequests must be used inside ProductRequestsProvider"
        );
    }

    return context;
}
