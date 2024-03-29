const pool = require("../conexaodb");
const jwt = require("jsonwebtoken");


const checkLogin = async (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."});
  }
  const token = authorization.split(" ")[1];

  try {
    const {id} = jwt.verify(token, process.env.JWT_PASSWORD);
  
    const {rows, rowCount} = await pool.query(
      "select * from users where id = $1",
      [id]
    );

    if (rowCount === 0) {
        
      return res.status(401).json({mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."});
    }
    const {password, ...user} = rows[0];
    req.user = user;
    

    next()

  } catch (error) {
    return res.status(401).json({mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."});
  }
};
module.exports = checkLogin;
