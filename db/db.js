const mongoose = require('mongoose');

// eslint-disable-next-line node/no-unsupported-features/es-syntax
exports.connectDB = async () => {
  const db = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('Done with Databases '))
    .catch('Error in DB 💥');
};
