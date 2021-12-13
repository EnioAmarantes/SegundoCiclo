const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/resposta")
const AutorDao = require("../models/autor")

router.get("/", (req, res) => {
    AutorDao.list().then((autores) => {
        res.json(autores)
    })
})

router.get("/:id", (req, res) => {
    AutorDao.getById(req.params.id).then(autor => {
        res.json(autor)
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Não foi possível localizar o autor"))
    })
})

router.post("/", (req, res) => {
    const {nome, autor, editora, ano} = req.body

    AutorDao.save(nome, autor, editora, ano).then(autor => {
        res.json(autor)
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Falha ao salvar o novo autor"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {nome} = req.body

    let obj = {}
    if (nome) obj.nome = nome

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    AutorDao.update(id, obj).then(autor => {
        if (autor)
            res.json(autor)
        else
            res.status(500).json(fail("Autor não encontrado"))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Falha ao alterar o autor"))
    })
})

router.delete("/:id", (req, res) => {
    AutorDao.delete(req.params.id).then(autor => {
        if (autor)
            res.json(autor)
        else
            res.status(500).json(fail("Autor não encontrado"))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Falha ao excluir o autor"))
    })
})

module.exports = router