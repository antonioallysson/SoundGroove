const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soundgroove',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

// Cadastro de usuário
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Criptografando a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).send('Erro ao criptografar a senha');
            return;
        }

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Erro ao registrar usuário:', err);
                res.status(500).send('Erro ao registrar usuário');
                return;
            }
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao logar:', err);
            res.status(500).send('Erro ao logar');
            return;
        }
        console.log('Resultados da consulta:', results);

        if (results.length > 0) {
            // Verifica se a senha inserida corresponde ao hash armazenado
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) {
                    console.error('Erro ao comparar senha:', err);
                    res.status(500).send('Erro ao processar a senha');
                    return;
                }

                if (isMatch) {
                    res.status(200).send({
                        message: 'Login bem-sucedido',
                        userId: results[0].id,
                        name: results[0].username, // Incluindo o nome do usuário
                    });
                } else {
                    res.status(401).send({ message: 'Credenciais inválidas' });
                }
            });
        } else {
            res.status(401).send({ message: 'Credenciais inválidas' });
        }
    });
});
// Rota para receber e salvar avaliação
app.post('/review', (req, res) => {
    const { trackId, userId, rating, comment, created_at, track_name } = req.body;

    // Validação
    if (rating === null || rating === undefined || rating === 0) {
        return res.status(400).json({ message: 'A avaliação precisa ter uma quantidade de estrelas' });
    }

    if (!comment || comment.trim() === '') {
        return res.status(400).json({ message: 'O comentário não pode ser vazio' });
    }

    // Cria a query SQL para inserir a avaliação
    const query = 'INSERT INTO reviews (track_id, user_id, rating, comment, created_at, track_name) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [trackId, userId, rating, comment, created_at, track_name], (err, result) => {
        if (err) {
            console.error('Erro ao salvar avaliação:', err);
            return res.status(500).send('Erro ao salvar avaliação');
        }
        res.status(201).json({ message: 'Avaliação salva com sucesso!' });
    });
});

// Rota para pegar todas as avaliações de um usuário
app.get('/review/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM reviews WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar avaliações:', err);
            return res.status(500).send('Erro ao buscar avaliações');
        }
        res.json(results); // Envia as avaliações para o frontend
    });
});

// Rota para buscar avaliações de uma música específica
app.get('/reviews/track/:trackId', (req, res) => {
    const trackId = req.params.trackId;
    console.log('Track ID recebido:', trackId); // Log do ID recebido
    // Query com JOIN para incluir o nome do usuário
    const query = `
        SELECT reviews.*, users.username 
        FROM reviews 
        JOIN users ON reviews.user_id = users.id 
        WHERE reviews.track_id = ?
    `;

    db.query(query, [trackId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar avaliações:', err);
            return res.status(500).send('Erro ao buscar avaliações');
        }
        console.log('Resultados encontrados:', results); // Log dos resultados
        res.json(results); // Envia as avaliações para o frontend
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});