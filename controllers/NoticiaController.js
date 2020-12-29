const database = require('../database/connection');


class NoticiaController{

    async index(resquest, response){
        const noticias  = await database('noticia');
        
        if(!noticias ){
            return response.status(404).json({error: 'Nenhuma Notícia Encontrada!'});
        }
        
        return response.status(200).json({noticias: noticias});
    }

    async create(request, response){
        console.log(request.file);
        console.log(request.body.titulo);
    

        const titulo = request.body.titulo;
        const resumo = request.body.resumo;
        const conteudo = request.body.conteudo;
        const foto = request.file['filename'];
        
        const[id]= await database('noticia').insert({
            titulo,
            resumo,
            conteudo,
            foto
        });
        
        return response.json(id);
    }

    async update(request, response){
        const { id } = request.params;
       

        const titulo = request.body.titulo;
        const resumo = request.body.resumo;
        const conteudo = request.body.conteudo;
        const foto = request.file['filename'];

        console.log(id);
        console.log(titulo);
        console.log(resumo);
        console.log(conteudo);
        console.log(request.file);



        const noticia = await database('noticia')
        .where('id', id)
        .update(
            {
                titulo: titulo,
                foto: foto,
                conteudo:conteudo,
                resumo:resumo
            }
        );

        

        if(!noticia){
            return response.status(401).json({error: 'Operation not permitted.'});
        }


       return response.status(200).json({noticia: noticia});

    }

    async delete(request, response){
        const { id } = request.params;
        const noticia = await database('noticia')
        .where('id', id)
        .first();

        if(!noticia){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await database('noticia').where('id', id).delete();
        console.log('Notícia Deletada!')
        return response.status(204).send();
    }

    async show(request, response){
        const { id } = request.params;
        const noticia = await database('noticia')
        .where('id', id)
        .first();

        if(!noticia){
            return response.status(401).json({error: 'Operation not permitted.'});
        }
        
        return response.status(200).json({noticia: noticia});

    }



}

module.exports = new NoticiaController();