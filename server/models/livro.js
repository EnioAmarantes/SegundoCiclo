const mongoose = require('mongoose');
const Autor = require('./autor');

const AutorSchema = new mongoose.Schema({
    nome: String
})

const LivroSchema = new mongoose.Schema({
    position: Number,
    nome: String,
    autor: {
        _id: String,
        nome: String
    },
    editora: String,
    ano: Number
});

const LivroModel = mongoose.model("Livro", LivroSchema);

module.exports = {
    list: async function() {
        const livros = await LivroModel.find({}).lean();
        return livros;
    },
    
    save: async function(nome, autor, editora, ano) {
        const livro = new LivroModel({
            nome: nome,
            autor: autor,
            editora: editora,
            ano: ano
        })
        await livro.save()
        console.log("Livro Salvo: " + livro);
        return livro
    },

    update: async function(id, obj) {
        let livro = await LivroModel.findById(id)
        if (!livro) {
            return false
        }
        
        Object.keys(obj).forEach(key => livro[key] = obj[key])
        await livro.save()
        return livro
    },

    delete: async function(id) {
        return await LivroModel.findByIdAndDelete(id)
    },

    getById: async function(id) {
        return await LivroModel.findById(id).lean()
    }
}