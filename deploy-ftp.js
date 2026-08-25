const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function deploy() {
  const client = new ftp.Client(30000);
  client.ftp.verbose = true;
  try {
    console.log('Connecting to FTP server at 136.243.25.149 ...');
    await client.access({
      host: '136.243.25.149',
      user: 'farna@gauziare.ge',
      password: process.env.FTP_PASSWORD || 'Farna898108045',
      port: 21,
      secure: false,
    });
    console.log('Connected! Uploading out/ directory to remote root...');

    // Upload local 'out' directory to remote root '/'
    const localDir = path.join(__dirname, 'out');
    await client.uploadFromDir(localDir, '/');

    // Also overwrite api/data_matches.json on the server with the new seeds!
    const seedPath = path.join(__dirname, 'public/api/seed_matches.json');
    if (fs.existsSync(seedPath)) {
      await client.uploadFrom(seedPath, 'api/data_matches.json');
      await client.uploadFrom(seedPath, 'api/seed_matches.json');
      console.log('Updated api/data_matches.json and api/seed_matches.json on server!');
    }

    console.log('==========================================');
    console.log('ALL FILES & SCORES UPLOADED SUCCESSFULLY!');
    console.log('==========================================');
  } catch (err) {
    console.error('FTP Upload error:', err);
  } finally {
    client.close();
  }
}

deploy();
