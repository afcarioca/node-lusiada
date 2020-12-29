const database = require('../database/connection');

class UserController{

	store(request, response){
		const {nome, email, senha} = request.body;

		console.log(email, senha);

		database.insert({nome, email, senha}).table("user").then(data=>{
			console.log(data)
			response.json({message: "Usuario Criado"})
		}).catch(error =>{
			console.log(error)
		})
	}

	async login(request, response){
		const {email, senha} = request.body;

		const usuario = await database('user')
        .where('email', email).andWhere('senha', senha)
        .select('nome')
        .first();

        if(!usuario ){
            return response.status(404).json({error: 'Nenhum Usuário Foi Encontrado!'});
		}
		

		const x = require('crypto').randomBytes(64).toString('hex');

		console.log(x);
		

        return response.status(200).json({token: x});
    }

		
}

module.exports = new UserController();