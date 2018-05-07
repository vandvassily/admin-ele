const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin-ele');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//声明schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  // recheck: String,
  token: String,
  create_time: Date
});
//根据schema生成model
// const model = {
//   User: mongoose.model('User', userSchema)
// };

var User = mongoose.model('User', userSchema)
var silence = new User({ username: 'Silence' });
silence.save(function (err) {
  if (err) return handleError(err);
  // saved!
})
