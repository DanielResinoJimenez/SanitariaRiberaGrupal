const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/all", userController.getUsers);
userRouter.get("/:email_user", userController.getUnUserEmail);
userRouter.get("/generate-password", userController.getGeneratedPassword);
userRouter.post('/reset-password', userController.requestPasswordReset);
userRouter.post("/register", userController.registro);
userRouter.get("/login", userController.login);

// Función token

// const createToken=(user) => { 
//   // Utilizamos jwt-simple y moment
//   const payload={
//     usuarioId:user.id,
//     createdAt:moment().unix(),
//     expiredAt:moment().add(60,"minutes").unix()
//   }
//   return jwt.encode(payload, "frase para probar .env")
//  }


// // Todos los usuario para probar
// userRouter.get("/allusers",  async (req, res) => {
//   const users = await User.findAll();
//   res.json(users)
  
// });

// // Función para registrar un usuario 

// userRouter.post("/register", async (req, res) => {
//   const user = await User.create({
//     nombre_user: req.body.nombre_user,
//     apellidos_user: req.body.apellidos_user,
//     email_user: req.body.email_user,
//     password_user: bcrypt.hashSync(
//       req.body.password_user,
//       10
//     ) /* Numero de veces que se ejecuta el algoritmo de cifrado */,
//     rol: req.body.rol
//   });
//   res.json(user);
// });

// // Función para comprobar si el usuario es correcto

// userRouter.get("/login", async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       email_user: req.body.email_user,
//     },
//   });

//   if (user) {
//     const isCorrectPass = bcrypt.compareSync(req.body.password_user, user.password_user);
//     if (isCorrectPass) {
//       // Utilizamos jwt-simple
//       res.json({ success: createToken(user) });
//     } else {
//       res.json({ error: "Contraseña incorrecta" });
//     }
//   } else {
//     res.json({ error: "Usuario incorrecto" });
//   }
// });

module.exports = userRouter;