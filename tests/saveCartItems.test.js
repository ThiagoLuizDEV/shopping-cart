const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test('saveCartItems com um cartItem', () => {
    saveCartItems('MLB1615760527');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  test('primeiro a chave cartItems e o segundo valor como argumento para saveCartItems', () => {
    saveCartItems('MLB1615760527');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'MLB1615760527');
  });
});
