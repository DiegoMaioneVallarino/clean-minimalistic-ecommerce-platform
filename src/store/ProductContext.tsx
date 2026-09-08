import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import {
    products as initialProducts,
} from "../services/products";

import type {
    Product,
} from "../types/Product";


type ProductContextType = {
    products: Product[];

    addProduct: (
        product: Omit<Product, "id">
    ) => void;

    updateProduct: (
        product: Product
    ) => void;

    deleteProduct: (
        productId: number
    ) => void;
};


const ProductContext =
    createContext<ProductContextType | undefined>(
        undefined
    );


type ProductProviderProps = {
    children: ReactNode;
};


export function ProductProvider({
    children,
}: ProductProviderProps) {

    const [products, setProducts] =
        useState<Product[]>(
            initialProducts
        );


    function addProduct(
        product: Omit<Product, "id">
    ) {

        setProducts(
            (currentProducts) => {

                const nextId =
                    currentProducts.length === 0
                        ? 0
                        : Math.max(
                            ...currentProducts.map(
                                (product) =>
                                    product.id
                            )
                        ) + 1;

                const newProduct: Product = {
                    ...product,
                    id: nextId,
                };

                return [
                    ...currentProducts,
                    newProduct,
                ];
            }
        );
    }


    function updateProduct(
        updatedProduct: Product
    ) {

        setProducts(
            (currentProducts) =>
                currentProducts.map(
                    (product) =>
                        product.id ===
                        updatedProduct.id
                            ? updatedProduct
                            : product
                )
        );
    }


    function deleteProduct(
        productId: number
    ) {

        setProducts(
            (currentProducts) =>
                currentProducts.filter(
                    (product) =>
                        product.id !==
                        productId
                )
        );
    }


    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}


export function useProducts() {

    const context =
        useContext(ProductContext);

    if (!context) {
        throw new Error(
            "useProducts must be used inside ProductProvider"
        );
    }

    return context;
}