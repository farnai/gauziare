const fs = require('fs');
const path = require('path');

// Read INITIAL_MATCHES directly from typescript file
const content = fs.readFileSync(path.join(__dirname, 'src/lib/initialData.ts'), 'utf8');
const match = content.match(/export const INITIAL_MATCHES: Match\[\] = (\[[\s\S]*?\]);/);

if (match && match[1]) {
  // eval safe object array
  const matches = eval(match[1]);
  const payload = {
    matches,
    lastUpdated: Date.now()
  };
  fs.mkdirSync(path.join(__dirname, 'public/api'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'public/api/seed_matches.json'), JSON.stringify(payload, null, 2), 'utf8');
  console.log('Successfully generated public/api/seed_matches.json with', matches.length, 'matches');
} else {
  console.error('Could not find INITIAL_MATCHES in initialData.ts');
}
