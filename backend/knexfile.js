const sharedConfig = {
  client: "mysql2",
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  pool: {
    afterCreate: (conn, done) =>
      conn.query('SET SESSION sql_mode="STRICT_TRANS_TABLES"', done),
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      host: "localhost",
      user: "root", // MySQL kullanıcı adınız
      password: "1234567", // MySQL şifreniz
      database: "library", // Kullanmak istediğiniz veritabanı adı
    },
  },
};
