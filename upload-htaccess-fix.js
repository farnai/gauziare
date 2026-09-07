const ftp = require('basic-ftp');
const path = require('path');

async function uploadHtaccess() {
  const client = new ftp.Client(30000);
  client.ftp.verbose = false;
  try {
    console.log('Connecting to FTP...');
    await client.access({
      host: '136.243.25.149',
      user: 'farna@gauziare.ge',
      password: process.env.FTP_PASSWORD || 'Farna898108045',
      port: 21,
      secure: false,
    });

    const htaccessPath = path.join(__dirname, 'public/.htaccess');
    console.log('Uploading .htaccess...');
    await client.uploadFrom(htaccessPath, '/.htaccess');
    console.log('✓ .htaccess uploaded successfully!');
    
    console.log('\n=== DONE ===');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

uploadHtaccess();
