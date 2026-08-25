const ftp = require('basic-ftp');

async function inspect() {
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
    console.log('PWD:', await client.pwd());
    const list = await client.list();
    console.log('List of /:', list.map(x => x.name));

    try {
      await client.cdup();
      console.log('Parent PWD:', await client.pwd());
      const parentList = await client.list();
      console.log('Parent List:', parentList.map(x => x.name));
    } catch (e) {
      console.log('Could not cdup above root (chrooted FTP user)');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

inspect();
