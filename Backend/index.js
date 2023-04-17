const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const saltRounds = 10;
const jwtSecret = 'MYSECRETKEY';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mynewdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  phone: { type: Number, unique: true },
  disc: { type: String},
  password: { type: String },
});

const User = mongoose.model('User', userSchema);


app.post('/register', async (req, res) => {
  try {
    const { username, email, phone, disc, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      if (user.username === username) {
        return res.status(409).json({ error: 'Username already taken' });
      }
      if (user.email === email) {
        return res.status(409).json({ error: 'Email already taken' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, phone, disc, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving user' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error finding user' });
  }
});


app.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user data');
  }
});




const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});





// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// const saltRounds = 10;

// app.use(cors());

// app.use(bodyParser.json());


// mongoose.connect('mongodb://localhost:27017/mydb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: { type: String },
// });

// const User = mongoose.model('User', userSchema);

// // register
// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;
//   let body = req.body;
//   console.log(body);

//   User.findOne({ $or: [{ username }, { email }] }, (err, user) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error finding user' });
//     }
//     if (user) {
//       if (user.username === username) {
//         return res.status(409).json({ error: 'Username already taken' });
//       }
//       if (user.email === email) {
//         return res.status(409).json({ error: 'Email already taken' });
//       }
//     }

//     bcrypt.hash(password, saltRounds, (err, hash) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error hashing password' });
//       }
//       const user = new User({ username, email, password: hash });
//       user.save((err) => {
//         if (err) {
//           return res.status(500).json({ error: 'Error saving user' });
//         }
//         res.status(201).json({ message: 'User created successfully' });
//       });
//     });
//   });
// });


// // login
// app.post('/login', (req, res) => {
//   let body = req.body;
//   console.log(body);
//   const { email, password } = req.body;

//   User.findOne({ email }, (err, user) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error finding user' });
//     }
//     if (!user) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error comparing passwords' });
//       }
//       if (!result) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       const token = jwt.sign({ userId: user._id }, jwtSecret);
//       res.json({ token });
//     });
//   });
// });


// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
