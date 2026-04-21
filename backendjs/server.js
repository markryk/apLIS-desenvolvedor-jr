const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

app.use(cors());

//Recebe JSON
app.use(express.json());

// "Banco de dados" em memória
let pacientes = [];

//Rota: "/api/v1/pacientes"

//GET: lista todos os pacientes
app.get('/api/v1/pacientes', async (req, res) => {
    //return res.status(200).json(pacientes);

    try {
        // Busca todos os pacientes
        const [rows] = await db.execute(
            'SELECT id, nome, dataNascimento, carteirinha, cpf FROM tb_pacientes ORDER BY id DESC'
        );

        return res.status(200).json(rows);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: "Erro ao buscar pacientes"
        });
    }
});

//POST: cria novo paciente
app.post('/api/v1/pacientes', async (req, res) => {

    try {
        const { nome, dataNascimento, carteirinha, cpf } = req.body;

        //Validação simples
        if (!nome || !dataNascimento || !carteirinha || !cpf) {
            return res.status(422).json({
                erro: "Campos obrigatórios: nome, data de nascimento, carteirinha e cpf"
            });
        }

        const [result] = await db.execute(
            'INSERT INTO tb_pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)', 
            [nome, dataNascimento, carteirinha, cpf]
        );

        return res.status(201).json({
            id: result.insertId,
            data: {nome, dataNascimento, carteirinha, cpf}, 
            status: "sucesso"
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }

});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});