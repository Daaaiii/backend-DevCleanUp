const pool = require("../conexaodb");

const newClient = async (req, res) => {
	const { name, email, telephone, coord_x, coord_y } = req.body;
	
	if ((!name || !email || !telephone, !coord_x, !coord_y)) {
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
			"insert into clients (name, email, telephone, createdAt, coord_x, coord_y) values ($1, $2, $3, $4, $5, $6) returning *";
		const body = [name, email, telephone, createdAt, parseInt(coord_x), parseInt(coord_y)];
		const { rows } = await pool.query(query, body);

		const { ...user } = rows[0];

		return res.status(201).json(user);
	} catch (error) {
		
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
const getClients = async (req, res) => {
	try {
		const { rows } = await pool.query("select * from clients");

		return res.json(rows);
	} catch (error) {
	
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
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

const updateClient = async (req, res) => {
	const { id } = req.params;
	const { name, email, telephone, coord_x, coord_y } = req.body;

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
		
		const updatedAt = new Date();

		const query =
			"update clients set name = $2, email = $3, telephone = $4, updatedAt = $5, coord_x = $6, coord_y = $7 where id=$1 returning *";
		const body = [id,name, email, telephone, updatedAt, parseInt(coord_x), parseInt(coord_y)];
		const { rows } = await pool.query(query, body);

		const { ...user } = rows[0];

		return res.status(201).json(user);
	} catch (error) {
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};
const deleteClient = async (req, res)=>{
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			mensagem: "Id não encontrado",
		});
	}
	try{
		const query = "delete from clients where id = $1"
		
		 await pool.query(query, [id]);		

		return res.status(200).json({mensagem: "Cliente excluído com sucesso"});
	}catch(error){
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
}

const getDistance = async (req, res) => {
	const x1 = 0;
	const y1 = 0;

	try {
		const { rows } = await pool.query(
			"SELECT * FROM clients WHERE coord_x IS NOT NULL AND coord_y IS NOT NULL"
		);

		const distancias = rows.map((cliente) => {
			const x2 = cliente.coord_x;
			const y2 = cliente.coord_y;
			const distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

			return {
				id: cliente.id,
				name: cliente.name,
				distance: distancia.toFixed(2),
			};
		});
		const orderedDistances = distancias.sort((a, b) => a.distance - b.distance);

		res.json(orderedDistances);
	} catch (error) {

		res.status(500).send("Erro interno do servidor");
	}
};
module.exports = {
	newClient,
	getClients,
	getClientById,
	updateClient,
	getDistance,
	deleteClient
};
