import { createServer } from 'http';
import app from "./server/app";
import { env } from './server/utils/env';
import { seed } from './seed';

const server = createServer(app);

const PORT = env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`API listening on port ${PORT} (env: ${env.NODE_ENV})`);
});

['SIGINT', 'SIGTERM', 'uncaughtException', 'unhandledRejection'].forEach((sig) => {
  process.on(sig, (err) => {
    if (err) console.log(err);
    console.log(`Shutting down due to ${sig}`);
    server.close(() => process.exit(0));
    // Fallback shutdown in 3s
    setTimeout(() => process.exit(1), 3000).unref();
  });
});

(async () => {
  await seed();
})();