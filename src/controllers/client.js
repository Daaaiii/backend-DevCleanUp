const pool = require("../conexaodb");

const newClient = async (req, res)=>{
    const {name, email, telephone} = req.body;
  if (!name || !email || !telephone) {
    return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
  }
 
  try {
    const emailExists = await pool.query(
      "select * from clients where email = $1",
      [email]
    );

    if (emailExists.rowCount > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado",
      });
    }
 
    const query =
      "insert into clients (name, email, telephone) values ($1, $2, $3) returning *";
    const body = [name, email, telephone];
    const {rows} = await pool.query(query, body);

    const {...user} = rows[0];

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}

module.exports = { newClient}