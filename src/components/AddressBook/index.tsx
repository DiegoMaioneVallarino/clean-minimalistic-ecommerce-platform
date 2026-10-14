
import { useState, type FormEvent } from "react";
import { useAuth } from "../../store/AuthContext";
import { useAddresses } from "../../store/AddressContext";
import type { ShippingAddressInput } from "../../types/ShippingAddress";
import "./AddressBook.css";

type Props = {
    selectedId?: string | null;
    onSelect?: (id: string) => void;
};

const emptyForm: ShippingAddressInput = {
    label: "Home",
    recipient: "",
    phone: "",
    street: "",
    exteriorNumber: "",
    interiorNumber: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    references: "",
};

export default function AddressBook({
    selectedId,
    onSelect,
}: Props) {
    const { user } = useAuth();
    const {
        addresses,
        defaultAddress,
        addAddress,
        removeAddress,
        setDefaultAddress,
    } = useAddresses();

    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState<ShippingAddressInput>({
        ...emptyForm,
    });

    if (!user) {
        return (
            <div className="address-book">
                <p>Sign in to manage your shipping addresses.</p>
            </div>
        );
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!/^\d{5}$/.test(form.postalCode)) {
            return;
        }

        addAddress(form);
        setForm({ ...emptyForm });
        setIsAdding(false);
    }

    function field(
        name: keyof ShippingAddressInput,
        placeholder: string,
        required = true
    ) {
        return (
            <input
                name={name}
                placeholder={placeholder}
                aria-label={placeholder}
                value={form[name]}
                required={required}
                onChange={(event) =>
                    setForm((current) => ({
                        ...current,
                        [name]: event.target.value,
                    }))
                }
            />
        );
    }

    return (
        <section className="address-book">
            <div className="address-book-heading">
                <div>
                    <h2>Shipping Addresses</h2>
                    <p>Choose where your order will arrive.</p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsAdding((value) => !value)}
                >
                    {isAdding ? "CANCEL" : "+ ADD NEW ADDRESS"}
                </button>
            </div>

            <div className="address-book-list">
                {addresses.map((address) => {
                    const selected = selectedId !== undefined
                        ? selectedId === address.id
                        : defaultAddress?.id === address.id;

                    return (
                        <div
                            key={address.id}
                            className={
                                selected
                                    ? "address-card selected"
                                    : "address-card"
                            }
                        >
                            <div className="address-card-heading">
                                <strong>{address.label}</strong>
                                {address.isDefault && (
                                    <span>DEFAULT</span>
                                )}
                            </div>

                            <p><strong>{address.recipient}</strong></p>
                            <p>
                                {address.street} {address.exteriorNumber}
                                {address.interiorNumber &&
                                    `, Int. ${address.interiorNumber}`}
                            </p>
                            <p>
                                {address.neighborhood}, {address.city},
                                {" "}{address.state}, CP {address.postalCode}
                            </p>
                            <p>{address.phone}</p>

                            <div className="address-card-actions">
                                {onSelect && (
                                    <button
                                        type="button"
                                        onClick={() => onSelect(address.id)}
                                    >
                                        {selected ? "✓ SELECTED" : "SELECT"}
                                    </button>
                                )}

                                {!address.isDefault && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDefaultAddress(address.id)
                                        }
                                    >
                                        SET DEFAULT
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Delete this address?"
                                            )
                                        ) {
                                            removeAddress(address.id);
                                        }
                                    }}
                                >
                                    DELETE
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {addresses.length === 0 && !isAdding && (
                <p className="address-empty">
                    No saved addresses yet.
                </p>
            )}

            {isAdding && (
                <form className="address-form" onSubmit={submit}>
                    <h3>New Address</h3>

                    <div className="address-form-grid">
                        {field("label", "Address label")}
                        {field("recipient", "Full name")}
                        {field("phone", "Phone")}
                        {field("street", "Street")}
                        {field("exteriorNumber", "Exterior number")}
                        {field("interiorNumber", "Interior number", false)}
                        {field("neighborhood", "Neighborhood")}
                        {field("city", "City")}
                        {field("state", "State")}
                        <input
                            aria-label="Postal code"
                            placeholder="Postal code"
                            inputMode="numeric"
                            pattern="[0-9]{5}"
                            maxLength={5}
                            required
                            value={form.postalCode}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    postalCode: event.target.value,
                                }))
                            }
                        />
                    </div>

                    <textarea
                        placeholder="Delivery references (optional)"
                        aria-label="Delivery references"
                        value={form.references}
                        onChange={(event) =>
                            setForm((current) => ({
                                ...current,
                                references: event.target.value,
                            }))
                        }
                    />

                    <button type="submit" className="address-save">
                        SAVE ADDRESS
                    </button>
                </form>
            )}
        </section>
    );
}
