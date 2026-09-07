const ftp = require('basic-ftp');
const path = require('path');

async function uploadCss() {
  const client = new ftp.Client(30000);
  client.ftp.verbose = true;
  try {
    console.log('Connecting to FTP...');
    await client.access({
      host: '136.243.25.149',
      user: 'farna@gauziare.ge',
      password: process.env.FTP_PASSWORD || 'Farna898108045',
      port: 21,
      secure: false,
    });

    // Ensure the CSS directory exists
    try { await client.ensureDir('/_next/static/css'); } catch(e) {}

    // Upload both CSS files explicitly
    const cssDir = path.join(__dirname, 'out/_next/static/css');
    const files = [
      '75f5b405c224bc8d.css',
      'add112b034a7d58e.css',
    ];

    for (const file of files) {
      const local = path.join(cssDir, file);
      const remote = `/_next/static/css/${file}`;
      console.log(`Uploading ${file} -> ${remote}`);
      await client.uploadFrom(local, remote);
      console.log(`✓ Done: ${file}`);
    }

    // Also re-upload the admin index.html
    const adminHtml = path.join(__dirname, 'out/admin/index.html');
    await client.uploadFrom(adminHtml, '/admin/index.html');
    console.log('✓ admin/index.html re-uploaded');

    console.log('\n=== CSS FIX UPLOAD COMPLETE ===');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

uploadCss();
