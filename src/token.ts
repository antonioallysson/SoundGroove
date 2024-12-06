// ID de antonio
const clientId = '0fe4640f22dc48a4ac20416c67c2b97d';
const clientSecret = '584808aaaee1458b89f4cc7233e1a0c7';

// ID de Jeziel
// const clientId = 'c0ca3712fa5f4a5f8a64b07809d87947';
// const clientSecret = 'd06d29fb26724534be196b78c8ddd55d';
const auth = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;


fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Authorization': auth,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials'
})
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;
    console.log('Token de Acesso:', accessToken);
  })
  .catch(error => console.error('Erro ao obter o token:', error));