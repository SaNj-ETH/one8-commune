import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import CartBottomBar from './components/CartBottomBar';
import CartDrawer from './components/CartDrawer';
import GreetingPopup from './components/GreetingPopup';
import CheckoutForm from './components/CheckoutForm';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import menuData from './data/menu.json';
import { CheckCircle } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);
  const [cart, setCart] = useState({}); // { itemId: { item, quantity } }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Flatten items for easier access if needed, but we map through categories

  const handleAdd = (item) => {
    setCart(prev => {
      const existing = prev[item.id];
      if (existing) {
        return { ...prev, [item.id]: { ...existing, quantity: existing.quantity + 1 } };
      }
      return { ...prev, [item.id]: { item, quantity: 1 } };
    });
    setToast(`${item.name} added to cart`);
  };

  const handleRemove = (item) => {
    setCart(prev => {
      const existing = prev[item.id];
      if (!existing) return prev;
      if (existing.quantity === 1) {
        const newCart = { ...prev };
        delete newCart[item.id];
        return newCart;
      }
      return { ...prev, [item.id]: { ...existing, quantity: existing.quantity - 1 } };
    });
  };

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0), [cartItems]);
  const cartCount = useMemo(() => cartItems.reduce((sum, { quantity }) => sum + quantity, 0), [cartItems]);

  const scrollToCategory = (catId) => {
    setActiveCategory(catId);
    const element = document.getElementById(catId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Intersection Observer to update active category on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, { rootMargin: '-150px 0px -70% 0px' });

    menuData.categories.forEach(cat => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleFinalSubmit = (formData) => {
    console.log("Order Details:", { cart, total: cartTotal, customer: formData });
    setIsCheckoutOpen(false);
    setOrderPlaced(true);
    setCart({});
    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000);
  };

  // Filter menu data based on search query
  const filteredMenuData = useMemo(() => {
    if (!searchQuery.trim()) return menuData;

    const filtered = {
      categories: menuData.categories.map(cat => ({
        ...cat,
        subcategories: cat.subcategories.map(sub => ({
          ...sub,
          items: sub.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })).filter(sub => sub.items.length > 0)
      })).filter(cat => cat.subcategories.length > 0)
    };

    return filtered;
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container">
      <GreetingPopup />
      {isSearchOpen && <SearchBar onSearch={handleSearch} onClose={() => { setIsSearchOpen(false); setSearchQuery(''); }} />}
      <Header onSearchClick={() => setIsSearchOpen(true)} cartCount={cartCount} />
      <CategoryNav
        categories={filteredMenuData.categories}
        activeCategory={activeCategory}
        onSelectCategory={scrollToCategory}
      />

      <main style={{ paddingBottom: '100px' }}>
        {filteredMenuData.categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-light)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No items found</p>
            <p style={{ fontSize: '0.9rem' }}>Try searching for something else</p>
          </div>
        ) : (
          filteredMenuData.categories.map((category) => (
            <div key={category.id} id={category.id} style={{ scrollMarginTop: '120px' }}>
              <h2 className="section-title" style={{ marginTop: '32px', fontSize: '1.5rem' }}>{category.name}</h2>

              {category.subcategories.map((sub) => (
                <div key={sub.name}>
                  <h3 style={{
                    padding: '16px 20px 8px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--color-text-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {sub.name}
                  </h3>
                  <div>
                    {sub.items.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        quantity={cart[item.id]?.quantity || 0}
                        onAdd={() => handleAdd(item)}
                        onRemove={() => handleRemove(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </main>

      <CartBottomBar
        itemCount={cartCount}
        total={cartTotal}
        onClick={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems.map(c => ({ ...c.item, quantity: c.quantity }))}
        onAdd={handleAdd}
        onRemove={handleRemove}
        total={cartTotal}
        onCheckout={handleProceedToCheckout}
      />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cartTotal}
        onSubmit={handleFinalSubmit}
      />

      {orderPlaced && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '24px',
            textAlign: 'center',
            animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <style>{`
              @keyframes popIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}</style>
            <div style={{ color: '#27ae60', marginBottom: '16px' }}>
              <CheckCircle size={64} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Order Placed!</h2>
            <p style={{ color: 'var(--color-text-light)' }}>Your order has been sent to the kitchen.</p>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
