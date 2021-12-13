const mongoose = require('mongoose');

const AutorSchema = mongoose.Schema({
    nome: String
});

const AutorModel = mongoose.model('Autor', AutorSchema);

module.exports = {
    list: async function() {
        const autores = await AutorModel.find({}).lean();
        return autores;
    },

    save: async function(nome) {
        const autor = new AutorModel({
            nome: nome
        });
        await autor.save();
        return autor;
    },

    update: async function(id, obj) {
        let autor = await AutorModel.findById(id)
        if (!autor) {
            return false
        }
        
        Object.keys(obj).forEach(key => autor[key] = obj[key])
        await autor.save()
        return autor
    },

    delete: async function(id) {
        return await AutorModel.findByIdAndDelete(id)
    },

    getById: async function(id) {
        return await AutorModel.findById(id).lean()
    }
}