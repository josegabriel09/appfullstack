const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require('../configs/connectDB');

router.post('/send-email', async (req, res) => {
    try {
        const { email } = req.body;

        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Por favor, forneça um e-mail válido.' });
        }

        
        let type = '';
        const [students] = await pool.query('SELECT * FROM STUDENT WHERE EMAIL = ?', [email]);
        const [collaborators] = await pool.query('SELECT * FROM COLLABORATOR WHERE EMAIL = ?', [email]);

        if (students.length > 0) {
            type = 'student';
        } else if (collaborators.length > 0) {
            type = 'collaborator';
        } else {
            return res.status(404).json({ error: 'Nenhum registro encontrado para o e-mail fornecido.' });
        }

        
        const firstName = email.split('@')[0];

        let subject = '';
        let message = '';

        // Determinar o assunto e a mensagem com base no tipo de destinatário
        if (type === 'student') {
            subject = 'Bem-vindo ao nosso app!';
            message = `<p style="color: black;">Olá ${firstName},</p><br><br><p style="color: black;">Muito obrigado pelo registro em nosso app, ${firstName},</p><br><p style="color: black;">Seu RA para login: ${generateRandomCode()}, lembre-se de alterá-la</p><br><a href="URL_PARA_ALTERAR_A_SENHA" style="color: black;">Clique aqui para alterar sua senha</a><br><br><p style="color: black;">Atenciosamente,</p><p style="color: black;">EduVision Brazil</p>`;
        } else if (type === 'collaborator') {
            const [collaborator] = collaborators; // Pegando o primeiro colaborador encontrado
            console.log('Dados do colaborador:', collaborator); // Adicione este log para depuração
            subject = `Bem-vindo à nossa equipe, colaborador ${firstName}!`;
            message = `<p style="color: black;">Olá ${firstName},</p><br><br><p style="color: black;">Bem-vindo à nossa equipe! Obrigado por se juntar a nós como colaborador.</p><br><p style="color: black;">Sua senha Padrão de login é: ${generateRandomCode()}, lembre-se de alterá-la</p><br><a href="URL_PARA_ALTERAR_A_SENHA" style="color: black;">Clique aqui para alterar sua senha</a><br><br><p style="color: black;">Atenciosamente,</p><p style="color: black;">EduVision Brazil</p>`;
        }
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'josemeloss01@gmail.com',
                pass: 'oktfqtnsvlfdlsnu'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

       
        const mailOptions = {
            from: 'seuemail@gmail.com',
            to: email,
            subject,
            html: message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.response); // Log de depuração

       
        res.status(200).json({ message: `E-mail enviado com sucesso para ${email}!` });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ error: 'Erro interno ao enviar e-mail.' });
    }
});

module.exports = router;
