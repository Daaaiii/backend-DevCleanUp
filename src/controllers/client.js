const pool = require("../conexaodb");

const newClient = async (req, res) => {
	const { name, email, telephone } = req.body;
	if (!name || !email || !telephone) {
		return res
			.status(400)
			.json({ mensagem: "Todos os campos são obrigatórios" });
	}

	try {
		const emailExists = await pool.query(
			"select * from clients where email = $1",
			[email]
		);
		const phoneExists = await pool.query(
			"select * from clients where telephone = $1",
			[telephone]
		);

		if (emailExists.rowCount > 0) {
			return res.status(400).json({
				mensagem: "Já existe cliente cadastrado com o e-mail informado",
			});
		}
		if (phoneExists.rowCount > 0) {
			return res.status(400).json({
				mensagem: "Já existe cliente cadastrado com esse telefone informado",
			});
		}
		const createdAt = new Date();

		const query =
			"insert into clients (name, email, telephone, createdAt) values ($1, $2, $3, $4) returning *";
		const body = [name, email, telephone, createdAt];
		const { rows } = await pool.query(query, body);

		const { ...user } = rows[0];

		return res.status(201).json(user);
	} catch (error) {
    console.log(error.message)
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
const getClients = async (req, res) => {
	try {
		const { rows } = await pool.query("select * from clients");

		return res.json(rows);
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

const getClientById = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			mensagem: "Id não encontrado",
		});
	}

	try {
		const { rows } = await pool.query("select * from clients where id = $1", [
			id,
		]);

		if (id) {
			return res.json(rows[0]);
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

const updateClient = async (req, res) => {
	const { id } = req.params;
	const { name, email, telephone } = req.body;
  
	if (!id) {
		return res.status(400).json({
			mensagem: "Id não encontrado",
		});
	}

	if (!name || !email || !telephone) {
		return res
			.status(400)
			.json({ mensagem: "Todos os campos são obrigatórios" });
	}

	try {
		const emailExists = await pool.query(
			"select * from clients where email = $1",
			[email]
		);
    if (emailExists.rowCount > 0 && emailExists.rows[0].id !== req.usuario.id) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado",
      });
    };
		const phoneExists = await pool.query(
			"select * from clients where telephone = $1",
			[telephone]
		);
    if (phoneExists.rowCount > 0 && phoneExists.rows[0].id !== req.usuario.id) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado",
      });
    };
		const updatedAt = new Date();
    console.log(updatedAt)

		const query =
			"insert into clients (name, email, telephone, updatedAt) values ($1, $2, $3, $4) returning *";
		const body = [name, email, telephone, updatedAt];
		const { rows } = await pool.query(query, body);

    console.log(rows[0])
		const { ...user } = rows[0];

		return res.status(201).json(user);
	} catch (error) {
    console.log(error.message)
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
module.exports = { newClient, getClients, getClientById, updateClient };
