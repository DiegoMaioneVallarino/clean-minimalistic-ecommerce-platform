
import type {
    TaxonomyEntry,
    TaxonomyKind,
} from "../types/Taxonomy";

const STORAGE_KEY = "maison.taxonomy.v1";

const defaults: TaxonomyEntry[] = [
    ["clothing", "T-Shirts", "t-shirts"],
    ["clothing", "Shirts", "shirts"],
    ["clothing", "Jackets", "jackets"],
    ["clothing", "Hoodies", "hoodies"],
    ["clothing", "Sweaters", "sweaters"],
    ["clothing", "Jeans", "jeans"],
    ["clothing", "Pants", "pants"],
    ["clothing", "Dresses", "dresses"],
    ["clothing", "Skirts", "skirts"],
    ["clothing", "Accessories", "accessories"],
    ["aesthetic", "Y2K", "y2k"],
    ["aesthetic", "Grunge", "grunge"],
    ["aesthetic", "Western", "western"],
    ["aesthetic", "Racing", "racing"],
    ["aesthetic", "Streetwear", "streetwear"],
    ["aesthetic", "Minimal", "minimal"],
    ["aesthetic", "Bohemian", "bohemian"],
    ["aesthetic", "Preppy", "preppy"],
    ["aesthetic", "Gothic", "gothic"],
    ["aesthetic", "70s Retro", "70s-retro"],
].map(([kind, name, slug], index) => ({
    id: `${kind}:${slug}`,
    kind: kind as TaxonomyKind,
    name,
    slug,
    description: "",
    active: true,
    order: index,
}));

export function slugify(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export async function getTaxonomy(): Promise<TaxonomyEntry[]> {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return defaults;

        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed)) return defaults;

        return parsed as TaxonomyEntry[];
    } catch {
        return defaults;
    }
}

export async function saveTaxonomy(
    entries: TaxonomyEntry[]
): Promise<void> {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(entries)
    );
}
