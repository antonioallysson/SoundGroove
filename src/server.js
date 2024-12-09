// Importa módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5000;
const cors = require('cors');

// Configura middlewares
app.use(bodyParser.json());
app.use(cors());

// Configuração do MySQL para conexão
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soundgroove',
});

// Estabelece conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    
    console.log('Conectado ao MySQL!');
});


// Rota para cadastro de usuários
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Criptografa a senha antes de salvar no banco de dados
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).send('Erro ao criptografar a senha');
            return;
        }

        // Insere os dados do usuário na tabela 'users'
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

// Rota para login de usuários
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Query para buscar o usuário pelo email
    const query = 'SELECT * FROM users WHERE email = ?'; 

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao logar:', err);
            res.status(500).send('Erro ao logar');
            return;
        }

        if (results.length > 0) { // Verifica se o usuário foi encontrado
            // Compara a senha fornecida com o hash armazenado no banco de dados
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
                        name: results[0].username,
                    });
                    // senha errada 
                } else {
                    res.status(401).send({ message: 'Senha inválida' });
                }
            });
            // Usuário não encontrado
        } else {
            res.status(401).send({ message: 'Usuário inválido' }); 
        }
    });
});

// Rota para salvar uma avaliação de música
app.post('/review', (req, res) => {
    const { trackId, userId, rating, comment, created_at, track_name } = req.body;

    // Validações
    if (rating === null || rating === undefined || rating === 0) {
        return res.status(400).json({ message: 'A avaliação precisa ter uma quantidade de estrelas' });
    }

    if (!comment || comment.trim() === '') {
        return res.status(400).json({ message: 'O comentário não pode ser vazio' });
    }

    // inserir avaliação no banco de dados
    const query = 'INSERT INTO reviews (track_id, user_id, rating, comment, created_at, track_name) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [trackId, userId, rating, comment, created_at, track_name], (err, result) => {
        if (err) {
            console.error('Erro ao salvar avaliação:', err);
            return res.status(500).send('Erro ao salvar avaliação');
        }
        res.status(201).json({ message: 'Avaliação salva com sucesso!' });
    });
});

// Rota para buscar todas as avaliações de um usuário
app.get('/review/:userId', (req, res) => {
    const userId = req.params.userId;
     // buscar as avaliações do usuário
    const query = 'SELECT * FROM reviews WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar avaliações:', err);
            return res.status(500).send('Erro ao buscar avaliações');
        }
         // Retorna as avaliações em formato JSON
        res.json(results);
    });
});

// Rota para buscar avaliações de uma música específica
app.get('/reviews/track/:trackId', (req, res) => {
     // pega o ID da música
    const trackId = req.params.trackId;
    const query = `
        SELECT reviews.*, users.username 
        FROM reviews 
        JOIN users ON reviews.user_id = users.id 
        WHERE reviews.track_id = ?
    `; 
    // buscar avaliações e incluir o nome do usuário
    db.query(query, [trackId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar avaliações:', err);
            return res.status(500).send('Erro ao buscar avaliações');
        }
        // Retorna as avaliações em formato JSON
        res.json(results); 
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
