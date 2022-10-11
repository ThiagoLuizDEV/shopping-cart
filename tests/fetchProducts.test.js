require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('1 é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('1.2 chamou o fetch', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('1.3 endpoint computador', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  test('1.4 objeto computadorSearch', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  test('1.5 sem argumento', async () => {
    expect.assertions(1);
    await expect(fetchProducts()).rejects.toThrow('You must provide an url')
  })
});
