const usersRoute = require("./data/users.json");
const productsRoute = require("./data/products.json");

module.exports = function getRoutes() {
  return {
    users: usersRoute,
    products: productsRoute,
  };
};
