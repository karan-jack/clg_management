const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/pages/student').filter(f => f.endsWith('.jsx') && f !== './src/pages/student/Dashboard.jsx');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/from\s+['"]\.\.\/\.\.\/Dashboard(\.jsx)?['"]/g, "from '../Dashboard'");
  fs.writeFileSync(f, content);
  console.log('Fixed ' + f);
});
