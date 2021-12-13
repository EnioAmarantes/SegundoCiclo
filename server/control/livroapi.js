const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/resposta")
const LivroDAO = require("../models/livro")

router.get("/", (req, res) => {
    LivroDAO.list().then((livros) => {
        res.json(livros)
    })
})

router.get("/:id", (req, res) => {
    LivroDAO.getById(req.params.id).then(livro => {
        res.json(sucess(livro))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possível localizar o livro"))
    })
})

router.post("/", (req, res) => {
    const {nome, autor, editora, ano} = req.body

    console.log(req);
    console.log("Requisição:" + nome + autor + editora + ano)
    LivroDAO.save(nome, autor, editora, ano).then(livro => {
        res.json(sucess(livro))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar o novo livro"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {nome, autor, editora, ano} = req.body

    let obj = {}
    if (nome) obj.nome = nome
    if (autor) obj.autor = autor
    if (editora) obj.editora = editora
    if (ano) obj.ano = ano

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    LivroDAO.update(id, obj).then(livro => {
        if (livro)
            res.json(livro)
        else
            res.status(500).json(fail("Livro não encontrado"))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Falha ao alterar o livro"))
    })
})

router.delete("/:id", (req, res) => {
    LivroDAO.delete(req.params.id).then(livro => {
        if (livro)
            res.json(livro)
        else
            res.status(500).json(fail("Livro não encontrado"))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Falha ao excluir o livro"))
    })
})

module.exports = router