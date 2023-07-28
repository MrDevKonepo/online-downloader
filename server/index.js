// rodar: node index.js na pasta server

const express = require('express');
const axios = require('axios');
const { parse } = require('node-html-parser');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/*
// Debug para verificar se o servidor encontra o link informado
app.get('/test', async (req, res) => {
    try {
      const { url } = req.query;
      const response = await axios.get(url);
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching website:', error);
      res.status(500).send('Ocorreu um erro ao acessar o site.');
    }
  });
*/  

app.post('/download', async (req, res) => {
    const { url } = req.body;
    //console.log('URL recebido pelo servidor: ', url); // ##debug
    try{
        const response = await axios.get(url);
        const root = parse(response.data);
        const videoElement = root.querySelector('video');

        if (!videoElement) {
            return res.status(404).send('Vídeo não encontrado na página.');
        }

        const videoUrl = videoElement.getAttribute('src');
        if (!videoUrl) {
            return res.status(404).send('Vídeo não encontrado na página.');
        }

        /*
        // primeira tentativa, não encontrou a url
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const videoUrl = $('video').attr('src');
        console.log('Video URL:', videoUrl); // Adicione este log
        if (!videoUrl) {
            throw new Error('Video not found')
        }
        */

        res.send(videoUrl);
    } catch (error) {
        console.error('Error finding video: ', error);
        res.status(500).send('Ocorreu um erro ao encontrar o vídeo.');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});
