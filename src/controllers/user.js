const newUser = (req, res)=>{
    const {nome, email, senha} = req.body;
    if(!nome || !email || !senha){
        return res.status(400).json({error: 'Dados incompletos'})
    }
    if(senha.length < 6 ){
        return res.status(400).json({error: 'Senha muito curta'})
    }
    
    res.status(201).json({mensagem: 'Usuário cadastrado com sucesso'})
}
const login = (req, res)=>{
    const {email, senha} = req.body;
    if(!email || !senha){
        return res.status(400).json({error: 'Dados incompletos'})
    }
    res.status(200).json({email, senha})
    
}

module.exports = {newUser, login}