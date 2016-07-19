const Fs = require('fs');
const Test = require('tap').test;
const Path = require('path');
const Babel = require('babel-core');

const fixturePath = Path.join.bind(Path, __dirname, 'fixtures');
const pluginPath = Path.resolve(__dirname, '..', 'lib', 'index.js');

Test('Object.entries transform', t => {

  const expected = Fs.readFileSync(fixturePath('expected.js'), { encoding: 'utf8' });
  const opts = { plugins: [pluginPath] };

  Babel.transformFile(fixturePath('actual.js'), opts, (err, {code}) => {
    t.same(code, expected);
    t.end();
  });
});
