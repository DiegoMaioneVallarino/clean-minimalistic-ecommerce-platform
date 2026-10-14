
export interface ProductReview {
    id: string;
    productId: number;
    userId: string;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: number;
}
