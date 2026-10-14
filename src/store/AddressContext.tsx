
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
    ShippingAddress,
    ShippingAddressInput,
} from "../types/ShippingAddress";

type AddressContextValue = {
    addresses: ShippingAddress[];
    defaultAddress: ShippingAddress | null;
    addAddress: (input: ShippingAddressInput) => void;
    removeAddress: (id: string) => void;
    setDefaultAddress: (id: string) => void;
};

const AddressContext = createContext<AddressContextValue | null>(null);

const STORAGE_PREFIX = "maison.addresses.v1:";

function readAddresses(email: string): ShippingAddress[] {
    try {
        const raw = localStorage.getItem(
            STORAGE_PREFIX + email.toLowerCase()
        );
        if (!raw) return [];

        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed)
            ? parsed as ShippingAddress[]
            : [];
    } catch {
        return [];
    }
}

export function AddressProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { user } = useAuth();
    const accountKey = user?.email.trim().toLowerCase() ?? null;

    const [records, setRecords] = useState<
        Record<string, ShippingAddress[]>
    >({});

    const addresses = useMemo(() => {
        if (!accountKey) return [];
        return records[accountKey] ??
            readAddresses(accountKey);
    }, [accountKey, records]);

    useEffect(() => {
        if (!accountKey) return;

        try {
            localStorage.setItem(
                STORAGE_PREFIX + accountKey,
                JSON.stringify(addresses)
            );
        } catch {
            // Browser storage may be unavailable.
        }
    }, [accountKey, addresses]);

    function updateAddresses(
        updater: (current: ShippingAddress[]) => ShippingAddress[]
    ) {
        if (!accountKey) return;

        setRecords((previous) => {
            const current = previous[accountKey] ??
                readAddresses(accountKey);

            return {
                ...previous,
                [accountKey]: updater(current),
            };
        });
    }

    function addAddress(input: ShippingAddressInput) {
        updateAddresses((current) => [
            ...current,
            {
                ...input,
                id: crypto.randomUUID(),
                isDefault: current.length === 0,
            },
        ]);
    }

    function removeAddress(id: string) {
        updateAddresses((current) => {
            const next = current.filter((address) => address.id !== id);
            if (!next.length) return [];

            if (!next.some((address) => address.isDefault)) {
                return next.map((address, index) => ({
                    ...address,
                    isDefault: index === 0,
                }));
            }
            return next;
        });
    }

    function setDefaultAddress(id: string) {
        updateAddresses((current) =>
            current.some((address) => address.id === id)
                ? current.map((address) => ({
                    ...address,
                    isDefault: address.id === id,
                }))
                : current
        );
    }

    const defaultAddress =
        addresses.find((address) => address.isDefault) ??
        addresses[0] ??
        null;

    return (
        <AddressContext.Provider
            value={{
                addresses,
                defaultAddress,
                addAddress,
                removeAddress,
                setDefaultAddress,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
}

export function useAddresses() {
    const context = useContext(AddressContext);

    if (!context) {
        throw new Error(
            "useAddresses must be used inside AddressProvider"
        );
    }

    return context;
}
