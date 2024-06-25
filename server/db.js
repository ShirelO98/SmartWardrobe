exports.db = {
  async createConnection() {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  },
  async  initialize(){
  await connection.execute(`CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
);
await connection.execute(`CREATE TABLE wardrobes_1 (
    wardrobe_id INT AUTO_INCREMENT PRIMARY KEY,
    wardrobe_name VARCHAR(100) NOT NULL
);
`)
  }
};
