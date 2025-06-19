import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  category: string;
}

interface BlockProps {
  title?: string;
  description?: string;
}

const Block: React.FC<BlockProps> = ({ title = "TechStore Pro", description = "Discover amazing products" }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Fake product data
  const products: Product[] = [
    {
      id: 1,
      name: "UltraBook Pro X1",
      price: 1299,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
      description: "Revolutionary laptop with quantum processing capabilities and holographic display.",
      rating: 4.8,
      category: "Laptops"
    },
    {
      id: 2,
      name: "SmartWatch Infinity",
      price: 399,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
      description: "AI-powered smartwatch that predicts your health needs before you do.",
      rating: 4.6,
      category: "Wearables"
    },
    {
      id: 3,
      name: "Neural Headphones",
      price: 299,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
      description: "Mind-reading headphones with telepathic noise cancellation technology.",
      rating: 4.9,
      category: "Audio"
    },
    {
      id: 4,
      name: "Quantum Phone 12",
      price: 999,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
      description: "Smartphone that exists in multiple dimensions simultaneously.",
      rating: 4.7,
      category: "Phones"
    },
    {
      id: 5,
      name: "AR Glasses Vision",
      price: 599,
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=300&h=200&fit=crop",
      description: "Augmented reality glasses that let you see into parallel universes.",
      rating: 4.5,
      category: "AR/VR"
    },
    {
      id: 6,
      name: "Hover Drone Mini",
      price: 449,
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=200&fit=crop",
      description: "Personal assistant drone with AI companion and coffee brewing capabilities.",
      rating: 4.4,
      category: "Drones"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCartItems(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    // Send completion event when user adds first item
    if (cartItems === 0) {
      window.postMessage({ 
        type: 'BLOCK_COMPLETION', 
        blockId: 'fake-product-showcase', 
        completed: true,
        data: { firstPurchase: product.name }
      }, '*');
      window.parent.postMessage({ 
        type: 'BLOCK_COMPLETION', 
        blockId: 'fake-product-showcase', 
        completed: true,
        data: { firstPurchase: product.name }
      }, '*');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#ffd700' : '#ddd' }}>
        ★
      </span>
    ));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '15px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '2.5rem' }}>
            {title} 🚀
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>
            {description}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '16px',
              minWidth: '200px',
              outline: 'none'
            }}
          />
          
          <div style={{
            background: cartItems > 0 ? '#ff6b6b' : 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            🛒 Cart ({cartItems})
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px',
        marginBottom: '30px'
      }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: selectedProduct?.id === product.id ? 'scale(1.02)' : 'scale(1)'
            }}
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
            />
            
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <h3 style={{
                  margin: '0 0 5px 0',
                  color: '#333',
                  fontSize: '1.3rem'
                }}>
                  {product.name}
                </h3>
                <span style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8rem'
                }}>
                  {product.category}
                </span>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                {renderStars(product.rating)}
                <span style={{ marginLeft: '10px', color: '#666' }}>
                  ({product.rating})
                </span>
              </div>
              
              <p style={{
                color: '#666',
                margin: '0 0 15px 0',
                lineHeight: '1.4'
              }}>
                {product.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  ${product.price}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  style={{
                    background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0, color: '#333' }}>
                {selectedProduct.name}
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '15px',
                marginBottom: '20px'
              }}
            />
            
            <div style={{ marginBottom: '15px' }}>
              {renderStars(selectedProduct.rating)}
              <span style={{ marginLeft: '10px', color: '#666' }}>
                ({selectedProduct.rating}/5)
              </span>
            </div>
            
            <p style={{
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              {selectedProduct.description}
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#333'
              }}>
                ${selectedProduct.price}
              </span>
              
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <footer style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '15px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🎯</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {filteredProducts.length}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Products Found
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>⭐</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {(products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1)}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Average Rating
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🛒</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {cartItems}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Items in Cart
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>💰</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              ${Math.min(...products.map(p => p.price))} - ${Math.max(...products.map(p => p.price))}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Price Range
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Block;