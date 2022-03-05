const { connect, connection } = require('mongoose');
// db named instaClone from my understanding this is where I name mongo db
const connectionString ='mongodb://localhost:27017/instaClone';


connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection so other files know where to look
module.exports = connection;