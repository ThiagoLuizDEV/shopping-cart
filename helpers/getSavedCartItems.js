const getSavedCartItems = () => {
  // seu código aqui
  const cart = localStorage.getItem('cartItems');
  return cart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
