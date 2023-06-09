// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const cartItem = document.querySelector('.cart__items'); 
const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
};

cartItem.addEventListener('click', cartItemClickListener);
/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  return li;
};

const produtos = async () => {
  const { results } = await fetchProducts('computador');
  const itens = document.getElementsByClassName('items')[0];
  results.forEach((product) => { 
    const { id, title, thumbnail } = product;
    const obj = { id, title, thumbnail };
    itens.appendChild(createProductItemElement(obj));
  });
};

const carrinho = async (product) => {
  const results = await fetchItem(product);
  const itens = document.getElementsByClassName('cart__items')[0];
  const { id, title, price } = results;
  const obj = { id, title, price };
  itens.appendChild(createCartItemElement(obj));
  saveCartItems(itens.innerHTML);
};
const clicar = () => {
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('item__add')) {
    const filho = (event.target.parentNode.firstChild.innerHTML);
    carrinho(filho);
  }
});
};
const CartElement = () => {
  const ol = document.createElement('ol');
  const cart = document.querySelector('.cart');
  ol.className = 'cart__items';
  cart.appendChild(ol);
  return ol;
};
const remove = () => {
  const cartItems = document.querySelectorAll('.cart__items');
  const removeCart = document.querySelector('.empty-cart');
  removeCart.addEventListener('click', () => {
    if (cartItems.length > 0) cartItems.forEach((event) => event.parentNode.removeChild(event));
    CartElement();
  });
};
window.onload = () => {
  produtos();
  clicar();
  remove();
  cartItem.innerHTML = getSavedCartItems();
};