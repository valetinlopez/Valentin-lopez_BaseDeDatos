// ================================
// TP MongoDB - Base "myapp"
// ================================

// Seleccionar base
use("myapp");

// ================================
// Colección: Categories
// ================================
db.categories.drop();
db.categories.insertMany([
  { _id: ObjectId(), name: "Electrónica" },
  { _id: ObjectId(), name: "Ropa" },
  { _id: ObjectId(), name: "Hogar" }
]);

// ================================
// Colección: Products
// ================================
db.products.drop();

const electronics = db.categories.findOne({ name: "Electrónica" });
const clothes = db.categories.findOne({ name: "Ropa" });

db.products.insertMany([
  {
    name: "Smartphone X10",
    price: 250000,
    stock: 15,
    categories: [electronics._id]
  },
  {
    name: "Remera deportiva",
    price: 15000,
    stock: 40,
    categories: [clothes._id]
  }
]);

// ================================
// Colección: Users
// ================================
db.users.drop();
db.users.insertMany([
  { name: "Valentín", email: "valen@example.com" },
  { name: "Lucía", email: "lucia@example.com" }
]);

// ================================
// Colección: Orders
// ================================
db.orders.drop();

const valen = db.users.findOne({ name: "Valentín" });
const phone = db.products.findOne({ name: "Smartphone X10" });
const shirt = db.products.findOne({ name: "Remera deportiva" });

db.orders.insertOne({
  userId: valen._id,
  date: new Date(),
  status: "pendiente",
  products: [
    { productId: phone._id, quantity: 1 },
    { productId: shirt._id, quantity: 2 }
  ]
});

// ================================
// Colección: Reviews
// ================================
db.reviews.drop();

const reviewProduct = db.products.findOne({ name: "Smartphone X10" });
const reviewUser = db.users.findOne({ name: "Lucía" });

db.reviews.insertOne({
  productId: reviewProduct._id,
  userId: reviewUser._id,
  rating: 5,
  comment: "Excelente producto!",
  date: new Date()
});

// ================================
// CONSULTAS DE VERIFICACIÓN
// ================================

// Mostrar productos con categorías
db.products.aggregate([
  {
    $lookup: {
      from: "categories",
      localField: "categories",
      foreignField: "_id",
      as: "categoryInfo"
    }
  }
]);

// Mostrar pedidos con usuario y productos
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "_id",
      as: "productDetails"
    }
  }
]);

// ================================
// UPDATES
// ================================

// Descontar 1 unidad de stock
db.products.updateOne(
  { name: "Smartphone X10" },
  { $inc: { stock: -1 } }
);

// Cambiar estado del pedido
db.orders.updateOne(
  { status: "pendiente" },
  { $set: { status: "enviado" } }
);

// ================================
// ÍNDICES (opcional)
// ================================
db.products.createIndex({ name: 1 });
db.orders.createIndex({ userId: 1 });

// ================================
// VALIDACIÓN DE ESQUEMA (opcional)
// ================================
db.runCommand({
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "stock"],
      properties: {
        name: { bsonType: "string" },
        price: { bsonType: "number", minimum: 0 },
        stock: { bsonType: "int", minimum: 0 }
      }
    }
  }
});
