const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function deploy() {
  const client = new ftp.Client(60000);
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
    console.log('Connected! Uploading updated files & assets...');

    // 1. Root index.html & .htaccess
    console.log('Uploading homepage index.html...');
    await client.uploadFrom(path.join(__dirname, 'out/index.html'), '/index.html');

    const htaccessPath = path.join(__dirname, 'public/.htaccess');
    if (fs.existsSync(htaccessPath)) {
      await client.uploadFrom(htaccessPath, '/.htaccess');
      console.log('✓ .htaccess uploaded');
    }

    // 2. OpenGraph images
    for (const og of ['og-image.jpg', 'og-image.png', 'og-final-night.jpg']) {
      const p = path.join(__dirname, 'public', og);
      if (fs.existsSync(p)) {
        await client.uploadFrom(p, `/${og}`);
        console.log(`✓ ${og} uploaded`);
      }
    }

    // 3. API Seed & Data matches
    try { await client.ensureDir('/api'); } catch (e) {}
    const seedPath = path.join(__dirname, 'public/api/seed_matches.json');
    if (fs.existsSync(seedPath)) {
      await client.uploadFrom(seedPath, '/api/data_matches.json');
      await client.uploadFrom(seedPath, '/api/seed_matches.json');
      console.log('✓ Updated /api/data_matches.json and /api/seed_matches.json');
    }

    // 4. _next static assets (CSS, JS Chunks)
    console.log('Uploading _next static assets directory...');
    const nextLocalDir = path.join(__dirname, 'out/_next');
    if (fs.existsSync(nextLocalDir)) {
      try { await client.ensureDir('/_next'); } catch (e) {}
      await client.uploadFromDir(nextLocalDir, '/_next');
      console.log('✓ _next assets uploaded');
    }

    // 5. Match pages for finals & special matches
    const keyMatches = ['m-final', 'm-friendly', 'm-third', 'm-sf-1', 'm-sf-2'];
    for (const mId of keyMatches) {
      const matchDir = path.join(__dirname, `out/match/${mId}`);
      if (fs.existsSync(matchDir)) {
        try { await client.ensureDir(`/match/${mId}`); } catch (e) {}
        await client.uploadFrom(path.join(matchDir, 'index.html'), `/match/${mId}/index.html`);
        console.log(`✓ Match page uploaded: /match/${mId}/index.html`);
      }
    }

    // 6. Admin and other top routes
    for (const route of ['about', 'admin', 'charity']) {
      const routeDir = path.join(__dirname, `out/${route}`);
      if (fs.existsSync(routeDir)) {
        try { await client.ensureDir(`/${route}`); } catch (e) {}
        const idx = path.join(routeDir, 'index.html');
        if (fs.existsSync(idx)) {
          await client.uploadFrom(idx, `/${route}/index.html`);
          console.log(`✓ Route page uploaded: /${route}/index.html`);
        }
      }
    }

    console.log('==========================================');
    console.log('ALL ESSENTIAL FILES & SCORES DEPLOYED SUCCESSFULLY!');
    console.log('==========================================');
  } catch (err) {
    console.error('FTP Upload error:', err);
    throw err;
  } finally {
    client.close();
  }
}

deploy();
