const ftp = require('basic-ftp');
const path = require('path');

async function uploadHtaccess() {
  const client = new ftp.Client(10000);
  try {
    await client.access({
      host: '136.243.25.149',
      user: 'farna@gauziare.ge',
      password: process.env.FTP_PASSWORD || 'Farna898108045',
      port: 21,
      secure: false,
    });
    await client.uploadFrom(path.join(__dirname, 'public/.htaccess'), '.htaccess');
    console.log('Uploaded .htaccess successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

uploadHtaccess();
