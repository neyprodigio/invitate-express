const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(bodyParser.json());

let convidados = [];

app.get('/convidados', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://react-convidar.vercel.app');
    res.json(convidados);
});

app.post('/convidados', (req, res) => {
    const { nome, email, dataNascimento, telefone } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'O nome é obrigatório.' });
    }

    const novoConvidado = {
        id: uuidv4(), // gera um novo ID exclusivo para cada novo convidado
        nome,
        email: email || '',
        dataNascimento: dataNascimento || '',
        telefone: telefone || '',
        isConfirmed: false,
    };

    convidados.push(novoConvidado);
    res.setHeader('Access-Control-Allow-Origin', 'https://react-convidar.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(201).json(novoConvidado);
});

app.put('/convidados/:id', (req, res) => {
    const { id } = req.params;
    const { isConfirmed } = req.body;

    const convidado = convidados.find((convidado) => convidado.id === id);

    if (!convidado) {
        return res.status(404).json({ message: 'Convidado não encontrado.' });
    }

    convidado.isConfirmed = isConfirmed;

    // Define o cabeçalho "Access-Control-Allow-Origin" antes de enviar a resposta
    res.setHeader('Access-Control-Allow-Origin', 'https://react-convidar.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Envia a resposta com o cabeçalho configurado
    res.json(convidado);
});

app.delete('/convidados/:id', (req, res) => {
    const { id } = req.params;

    const index = convidados.findIndex((convidado) => convidado.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Convidado não encontrado.' });
    }

    convidados.splice(index, 1);

    // Define o cabeçalho "Access-Control-Allow-Origin" antes de enviar a resposta
    res.setHeader('Access-Control-Allow-Origin', 'https://react-convidar.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Envia a resposta com o cabeçalho configurado
    res.json({ message: 'Convidado removido com sucesso.' });
});

app.get('/convidados/confirmados', (req, res) => {
    const confirmados = convidados.filter((convidado) => convidado.isConfirmed);

    // Define o cabeçalho "Access-Control-Allow-Origin" antes de enviar a resposta
    res.setHeader('Access-Control-Allow-Origin', 'https://react-convidar.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Envia a resposta com o cabeçalho configurado
    res.json(confirmados);
});

app.get('/convidados/nao-confirmados', (req, res) => {
    const naoConfirmados = convidados.filter((convidado) => !convidado.isConfirmed);
    res.setHeader('Access-Control-Allow-Origin', 'https://react-convidar.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.json(naoConfirmados);
});

app.get('/convidados/total', (req, res) => {
    const total = convidados.length;
    res.setHeader('Access-Control-Allow-Origin', 'https://react-convidar.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.json({ total });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});
