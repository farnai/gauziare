const ftp = require('basic-ftp');

async function testFtp() {
  const client = new ftp.Client(10000);
  client.ftp.verbose = true;
  try {
    console.log('Connecting to 136.243.25.149 ...');
    await client.access({
      host: '136.243.25.149',
      user: 'farna@gauziare.ge',
      password: process.env.FTP_PASSWORD || 'Farna898108045',
      port: 21,
      secure: false,
    });
    console.log('CONNECTED TO FTP SUCCESSFULLY!');
    const list = await client.list();
    console.log('Remote Directory Listing:');
    for (const item of list) {
      console.log(` - ${item.name} (${item.isDirectory ? 'DIR' : 'FILE'}, ${item.size} bytes)`);
    }
  } catch (err) {
    console.error('FTP Error:', err);
  } finally {
    client.close();
  }
}

testFtp();
