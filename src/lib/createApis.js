import { listModules } from 'awilix';

export default function createApis(router, container) {
  const result = listModules('../api/*.js', { cwd: __dirname });
  result.forEach(
    m => require(m.path).default(router, container)
  );
}

