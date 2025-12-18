import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onEdit, onDelete, onAddToCart, loading }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="no-image">📦</div>
                <h3>No Products Found</h3>
                <p>Start by adding your first product!</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
};

export default ProductList;
