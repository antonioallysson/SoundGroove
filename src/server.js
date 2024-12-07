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

// Login de usuário
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao logar:', err);
            res.status(500).send('Erro ao logar');
            return;
        }

        if (results.length > 0) {
            // Verifica se a senha inserida corresponde ao hash armazenado
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) {
                    console.error('Erro ao comparar senha:', err);
                    res.status(500).send('Erro ao processar a senha');
                    return;
                }

                if (isMatch) {
                    res.status(200).send({ message: 'Login bem-sucedido', userId: results[0].id });
                } else {
                    res.status(401).send('Credenciais inválidas');
                }
            });
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    });
});

// Avaliação
app.post('/review', (req, res) => {
    const { trackId, userId, rating, comment } = req.body;
    const query = 'INSERT INTO reviews (track_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
    db.query(query, [trackId, userId, rating, comment], (err, result) => {
        if (err) {
            console.error('Erro ao salvar avaliação:', err);
            res.status(500).send('Erro ao salvar avaliação');
            return;
        }
        res.status(201).send('Avaliação salva com sucesso!');
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
