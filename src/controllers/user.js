const pool = require("../conexaodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const newUser = async (req, res)=>{
    const {name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
  }
 
  try {
    const emailExists = await pool.query(
      "select * from users where email = $1",
      [email]
    );

    if (emailExists.rowCount > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado",
      });
    }
    const encriptedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date();
    const query =
      "insert into users (name, email, password,createdAt) values ($1, $2, $3, $4) returning *";
    const body = [name, email, encriptedPassword, createdAt];
    const {rows} = await pool.query(query, body);

    const {password: _, ...user} = rows[0];

    return res.status(201).json(user);
  } catch (error) {

    return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}
const login = async (req, res)=>{
    const {email, password} = req.body;
 
 
  try {
    const {rows, rowCount} = await pool.query(
      "select * from users where email = $1",
      [email]
    );
    

    if (rowCount === 0) {
      return res.status(400).json({mensagem: "Usuário e/ou senha inválido(s)"});
    }
    const {password: userPassword, ...user} = rows[0];

    const correctPassword = await bcrypt.compare(password, userPassword);

    if (!correctPassword) {
      return res.status(400).json({mensagem: "Usuário e/ou senha inválido(s)"});
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_PASSWORD, {expiresIn: "8h"});

    return res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}

module.exports = {newUser, login}