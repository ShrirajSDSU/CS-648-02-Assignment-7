/* global db print */
/* eslint no-restricted-globals: "off" */
db.products.remove({});
const ProdDB = [
  {
    id: 1,
    name: 'Blue Shirt',
    category: 'Shirts',
    price: 30,
    imageURL: 'https://image.shutterstock.com/image-photo/happy-handsome-man-wear-blue-600w-743634955.jpg',
  },

  {
    id: 2,
    name: 'Blue Denim',
    category: 'Jeans',
    price: 50,
    imageURL: 'https://image.shutterstock.com/z/stock-photo-blue-jeans-isolated-on-white-96398333.jpg',
  },
  {
    id: 3,
    name: 'Leather Brown Belt',
    category: 'Accessories',
    price: 50,
    imageURL: 'https://image.shutterstock.com/z/stock-photo-fastened-fashionable-men-s-brown-leather-belt-with-dark-matted-metal-buckle-isolated-on-white-1038772180.jpg',
  },


];

db.products.insertMany(ProdDB);
const count = db.products.count();
print('Inserted', count, 'products');
db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });
db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ price: 1 });
