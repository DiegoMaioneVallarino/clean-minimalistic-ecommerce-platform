
import { useEffect, useState } from "react";

import type {
    TaxonomyEntry,
    TaxonomyKind,
} from "../../types/Taxonomy";

import {
    getTaxonomy,
    saveTaxonomy,
    slugify,
} from "../../services/taxonomy";

import "./AdminCategories.css";

function AdminCategories() {
    const [entries, setEntries] = useState<TaxonomyEntry[]>([]);
    const [kind, setKind] = useState<TaxonomyKind>("clothing");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        getTaxonomy().then((data) => {
            if (!cancelled) {
                setEntries(data);
                setLoading(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const visible = entries
        .filter((entry) => entry.kind === kind)
        .sort((a, b) => a.order - b.order);

    function resetForm() {
        setEditingId(null);
        setName("");
        setDescription("");
        setError("");
    }

    function changeKind(next: TaxonomyKind) {
        setKind(next);
        resetForm();
    }

    function edit(entry: TaxonomyEntry) {
        setEditingId(entry.id);
        setName(entry.name);
        setDescription(entry.description);
        setError("");
    }

    async function persist(next: TaxonomyEntry[]) {
        try {
            await saveTaxonomy(next);
            setEntries(next);
            return true;
        } catch {
            setError("Could not save changes.");
            return false;
        }
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const cleanName = name.trim();
        const slug = slugify(cleanName);

        if (!cleanName || !slug) {
            setError("Enter a valid category name.");
            return;
        }

        const duplicate = entries.some(
            (entry) =>
                entry.kind === kind &&
                entry.id !== editingId &&
                (entry.slug === slug ||
                    entry.name.toLowerCase() ===
                        cleanName.toLowerCase())
        );

        if (duplicate) {
            setError("This category already exists.");
            return;
        }

        let next: TaxonomyEntry[];

        if (editingId) {
            next = entries.map((entry) =>
                entry.id === editingId
                    ? {
                        ...entry,
                        name: cleanName,
                        description: description.trim(),
                    }
                    : entry
            );
        } else {
            next = [
                ...entries,
                {
                    id: crypto.randomUUID(),
                    kind,
                    name: cleanName,
                    slug,
                    description: description.trim(),
                    active: true,
                    order: visible.length,
                },
            ];
        }

        if (await persist(next)) resetForm();
    }

    async function toggleActive(entry: TaxonomyEntry) {
        await persist(
            entries.map((item) =>
                item.id === entry.id
                    ? { ...item, active: !item.active }
                    : item
            )
        );
    }

    async function remove(entry: TaxonomyEntry) {
        const confirmed = window.confirm(
            `Delete "${entry.name}"? Only delete entries not assigned to products.`
        );

        if (!confirmed) return;

        if (await persist(
            entries.filter((item) => item.id !== entry.id)
        )) {
            if (editingId === entry.id) resetForm();
        }
    }

    return (
        <div className="admin-categories">
            <header className="admin-content-header">
                <div>
                    <p>Store administration</p>
                    <h2>Categories & Styles</h2>
                </div>
            </header>

            <div className="taxonomy-tabs">
                <button
                    type="button"
                    className={kind === "clothing" ? "active" : ""}
                    onClick={() => changeKind("clothing")}
                >
                    Clothing Types
                </button>

                <button
                    type="button"
                    className={kind === "aesthetic" ? "active" : ""}
                    onClick={() => changeKind("aesthetic")}
                >
                    Aesthetics
                </button>
            </div>

            <div className="taxonomy-layout">
                <section className="taxonomy-list">
                    <div className="taxonomy-list-heading">
                        <h3>
                            {kind === "clothing"
                                ? "Clothing Types"
                                : "Aesthetics"}
                        </h3>
                        <span>{visible.length} entries</span>
                    </div>

                    {loading ? (
                        <p>Loading categories...</p>
                    ) : visible.length === 0 ? (
                        <p>No categories yet.</p>
                    ) : (
                        visible.map((entry) => (
                            <article
                                key={entry.id}
                                className="taxonomy-row"
                            >
                                <div className="taxonomy-row-info">
                                    <strong>{entry.name}</strong>
                                    <span>/{entry.slug}</span>
                                    <small>
                                        {entry.active
                                            ? "Active"
                                            : "Inactive"}
                                    </small>
                                </div>

                                <div className="taxonomy-row-actions">
                                    <button
                                        type="button"
                                        onClick={() => edit(entry)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleActive(entry)
                                        }
                                    >
                                        {entry.active
                                            ? "Disable"
                                            : "Enable"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => remove(entry)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </section>

                <form
                    className="taxonomy-form"
                    onSubmit={handleSubmit}
                >
                    <h3>
                        {editingId
                            ? "Edit category"
                            : "New category"}
                    </h3>

                    <label>
                        Name
                        <input
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder={
                                kind === "clothing"
                                    ? "e.g. Cargo Pants"
                                    : "e.g. Dark Academia"
                            }
                            required
                        />
                    </label>

                    <label>
                        Slug
                        <input
                            value={
                                editingId
                                    ? entries.find(
                                        (entry) =>
                                            entry.id === editingId
                                    )?.slug ?? ""
                                    : slugify(name)
                            }
                            disabled
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            rows={4}
                            placeholder="Optional description"
                        />
                    </label>

                    {error && (
                        <p className="taxonomy-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="taxonomy-form-actions">
                        <button type="submit">
                            {editingId
                                ? "SAVE CHANGES"
                                : "CREATE CATEGORY"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                            >
                                CANCEL
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminCategories;
