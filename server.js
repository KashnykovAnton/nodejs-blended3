const express = require("express");
const dotenv = require("dotenv");
const { colors } = require("./helpers");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// РЕГИСТРАЦИЯ - сохранение нового пользователя в БД
// АУТЕНТИФИКАЦИЯ - проверка пользователя (email, password, token ...)
// АВТОРИЗАЦИЯ - права на доступ к опр. ресурсам сайта (user не имеет тех же прав,что admin)

// load config variables
dotenv.config({ path: "./config/.env" });

const app = express();

// body parser
app.use(express.json());

const { PORT } = process.env;

// routes
const books = require("./routes/booksRouts");
app.use("/api/v1/books", books);

app.post("/api/v1/register", async (req, res) => {
  // 1) получаем данные от пользователя (как минимум email и password и name)
  const { firstName, lastName, email, password } = req.body;
  // 2) делаем валидацию полей пользователя
  if (!lastName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Enter correct fullfields", code: 400 });
  }
  // 3) выполняем поиск пользователя в нашей базе
  const user = await User.findOne({ email });
  // 4) если нашли - сообщаем, что пользователь уже есть и можно логиниться
  if (user) {
    return res
      .status(409)
      .json({ message: "This user is already exists", code: 409 });
  }
  // 5) если нет - то солим пароль
  const saltPassword = await bcrypt.hash(password, 3);
  console.log("saltPassword: ", saltPassword);
  // 6) далее - сохраняем пользователя в базе данных
  const candidate = await User.create({
    firstName,
    lastName,
    email,
    password: saltPassword,
    role: "",
  });
  // 7) генерим токен для пользователя и сохраняем в БД
  const token = jwt.sign(
    { user_id: candidate._id },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "2h" }
  );
  candidate.token = token;
  await candidate.save();
  // 8) отправляем ответ об успехе регистрации
  return res
    .status(201)
    .json({ message: "Success", code: 201, user: candidate });
});

app.post("/api/v1/login", async (req, res) => {
  // 1) получаем данные от пользователя (как минимум email и password и name)
  const { lastName, email, password } = req.body;
  // 2) делаем валидацию полей пользователя
  if (!lastName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Enter correct fullfields", code: 400 });
  }
  // 3) выполняем поиск пользователя в нашей базе
  const user = await User.findOne({ email });
  // 4) если нет - сообщаем, что нужно зарегиться
  if (!user) {
    return res
      .status(400)
      .json({ message: "User is not registered", code: 400 });
  }
  // 5) если есть - проверяем логин и пароль
  const candidatePassword = await bcrypt.compare(password, user.password);

  // 6) если логин или пароль не совпадают - то выдаем ошибку аутентификации
  if (!user.email === email && !candidatePassword) {
    return res
      .status(401)
      .json({ message: "Wrong email or password", code: 401 });
  }
  // 7) проверка токена на валидность при условии, что логин и пароль ОК
  jwt.verify(
    user.token,
    process.env.TOKEN_SECRET_KEY,
    async (error, decoded) => {
      if (error) {
        const token = jwt.sign(
          { user_id: user._id },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "2h" }
        );
        user.token = token;
        await user.save();
        console.log("new token");
        return res
          .status(200)
          .json({ message: "Success", code: 200, user: user });
      }
      console.log("token has already");
      return res
        .status(200)
        .json({ message: "Success", code: 200, user: user });
    }
  );

  // 8) если токен не валиден - выдаем новый токен
  // 9) отправляем ответ об успехе логинизации
});

// TODO:
// Проверка токена из заголовков - сделать middleware/auth
// дописать logout

app.post("/logout", () => {
  // 1) получаем токен из заголовков
  // 2) расшифровыем токен, достаем payload
  // 3) если внутри есть id - то токен валидный и меняем его на null
  // 4) если id нет внутри, то токен не валидный
});

// page not found
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// connect db
connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.green.italic);
});

process.on("unhandledRejection", (error, _) => {
  if (error) {
    console.log(`error: ${error.message}`.red);
    server.close(() => process.exit(1));
  }
});
