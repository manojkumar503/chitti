import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { productAPI } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle add product
  const handleAddProduct = async (productData) => {
    try {
      await productAPI.createProduct(productData);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product. Please try again.');
    }
  };

  // Handle edit product
  const handleEditProduct = async (productData) => {
    try {
      await productAPI.updateProduct(editingProduct._id, productData);
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product. Please try again.');
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    try {
      await productAPI.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Open edit form
  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Toggle cart modal
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Handle update cart quantity
  const handleUpdateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle remove from cart
  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  return (
    <div className="app">
      <Navbar cart={cart} onCartClick={toggleCart} />

      <div className="app-container">
        <div className="app-header">
          <h2>Products</h2>
          <button className="btn-add-product" onClick={() => setShowForm(true)}>
            ➕ Add New Product
          </button>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <ProductList
          products={products}
          onEdit={openEditForm}
          onDelete={handleDeleteProduct}
          onAddToCart={handleAddToCart}
          loading={loading}
        />
      </div>

      {showForm && (
        <ProductForm
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          initialData={editingProduct}
          onCancel={closeForm}
        />
      )}

    </div>
  );
}

export default App;
