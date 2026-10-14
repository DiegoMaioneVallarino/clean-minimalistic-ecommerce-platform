
export type TaxonomyKind = "clothing" | "aesthetic";

export interface TaxonomyEntry {
    id: string;
    kind: TaxonomyKind;
    name: string;
    slug: string;
    description: string;
    active: boolean;
    order: number;
}
