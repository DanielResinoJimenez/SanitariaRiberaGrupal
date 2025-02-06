const userRouter = require("express").Router();
const User = require("../database/models/User");

// const bcrypt = require("bcryptjs");
// const { check, validationResult } = require("express-validator");
// const moment = require("moment");
// const jwt = require("jwt-simple");

// const createToken=(user) => { 
//   // Utilizamos jwt-simple y moment
//   const payload={
//     usuarioId:user.id,
//     createdAt:moment().unix(),
//     expiredAt:moment().add(60,"minutes").unix()
//   }
//   return jwt.encode(payload, "frase para probar .env")
//  }


// Todos los usuario para probar
userRouter.get("/allusers",  async (req, res) => {
  const users = await User.findAll();
  res.json(users)
  
});


userRouter.post("/register", async (req, res) => {
  const user = await User.create({
    nombre_user: req.body.nombre_user,
    apellidos_user: req.body.apellidos_user,
    email_user: req.body.email_user,
    password_user: bcrypt.hashSync(
      req.body.password_user,
      10
    ) /* Numero de veces que se ejecuta el algoritmo de cifrado */,
    
  });
  res.json(user);
});

userRouter.get("/login", async (req, res) => {
  console.log(req.body.email_user)
  const user = await User.findOne({
    where: {
      email_user: req.body.email_user,
    },
  });

  if (user) {
    const isCorrectPass = bcrypt.compareSync(req.body.password_user, user.password_user);
    if (isCorrectPass) {
      // Utilizamos jwt-simple
      res.json({ success: createToken(user) });
    } else {
      res.json({ error: "Contraseña incorrecta" });
    }
  } else {
    res.json({ error: "Usuario incorrecto" });
  }
});

module.exports = userRouter;