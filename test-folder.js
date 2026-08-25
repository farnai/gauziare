const ftp = require('basic-ftp');

async function testFolders() {
  const client = new ftp.Client(10000);
  client.ftp.verbose = true;
  try {
    await client.access({
      host: '136.243.25.149',
      user: 'farna@gauziare.ge',
      password: process.env.FTP_PASSWORD || 'Farna898108045',
      port: 21,
      secure: false,
    });
    console.log('Current PWD:', await client.pwd());
    const list = await client.list();
    console.log('Items in current folder:');
    for (const item of list) {
      console.log(`- ${item.name} (${item.isDirectory ? 'DIR' : 'FILE'})`);
    }

    // Try to see if public_html or subdirectories exist or if we can write a test file
    await client.uploadFrom(Buffer.from('hello from test'), 'test.html');
    console.log('Uploaded test.html');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

testFolders();
