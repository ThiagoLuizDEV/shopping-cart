require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  
  test('1 é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('1.2 chamou o fetch', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('1.3 endpoint MLB1615760527', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
  test('1.4 objeto item', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });
  test('1.5 sem argumento', async () => {
    expect.assertions(1);
    await expect(fetchItem()).rejects.toThrow(new Error('You must provide an url'))
  })
});
