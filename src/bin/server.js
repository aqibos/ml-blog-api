import appModulePath from 'app-module-path';
appModulePath.addPath(__dirname + '/../');

import createServer from '../lib/createServer';


const PORT = process.env.PORT || 1338;

createServer().then(
  app => {
    app.listen(PORT, () => console.log('Server listening on', PORT, 'in', process.env.NODE_ENV, 'mode'));
  },
  err => {
    console.error(err.stack);
    process.exit(1);
  }
);

