// Download pinned upstream artwork; only resize/encode it, never recolor it.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const destination = new URL('../public/assets/skills/', import.meta.url);
const dashboard = 'https://raw.githubusercontent.com/homarr-labs/dashboard-icons/ce550a844bad92ea19b5926cb887285c46bac01a/';
const devicon = 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/';
const elysia = 'https://raw.githubusercontent.com/elysiajs/documentation/f68573703415eb3df63ff02851013148fea4748f/';
const sources = {
  figma: dashboard + 'png/figma.png',
  javascript: 'https://raw.githubusercontent.com/abranhe/programming-languages-logos/e1be48ad2dffe3e6e0e24fdefa9e740167fb2315/src/javascript/javascript_128x128.png',
  typescript: dashboard + 'png/typescript.png',
  react: dashboard + 'png/reactjs.png',
  nextdotjs: dashboard + 'png/nextjs.png',
  html5: devicon + 'icons/html5/html5-original.svg',
  css: devicon + 'icons/css3/css3-original.svg',
  tailwindcss: dashboard + 'png/tailwind.png',
  vuedotjs: dashboard + 'png/vue-js.png',
  php: dashboard + 'png/php.png',
  express: devicon + 'icons/express/express-original.svg',
  mysql: dashboard + 'png/mysql.png',
  postgresql: dashboard + 'png/postgresql.png',
  prisma: devicon + 'icons/prisma/prisma-original.svg',
  redis: dashboard + 'png/redis.png',
  firebase: dashboard + 'png/firebase.png',
  elysia: elysia + 'docs/public/assets/elysia.png',
  git: dashboard + 'png/git.png',
  docker: dashboard + 'png/docker.png',
  githubactions: devicon + 'icons/githubactions/githubactions-original.svg',
  jest: devicon + 'icons/jest/jest-plain.svg',
  playwright: devicon + 'icons/playwright/playwright-original.svg',
  postman: dashboard + 'png/postman.png',
  swagger: dashboard + 'png/swagger.png',
  kotlin: dashboard + 'png/kotlin.png',
  android: dashboard + 'png/android-robot.png',
};

async function download(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

await mkdir(destination, { recursive: true });
// Small batches avoid flooding the upstream hosts.
const entries = Object.entries(sources);
for (let i = 0; i < entries.length; i += 5) {
  await Promise.all(entries.slice(i, i + 5).map(async ([slug, url]) => {
    const artwork = await download(url);
    await sharp(artwork).resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL(`${slug}.png`, destination)));
    console.log(`Downloaded ${slug}.png`);
  }));
}
for (const [filename, url] of Object.entries({
  'LICENSE-dashboard-icons.txt': dashboard + 'LICENSE',
  'LICENSE-devicon.txt': devicon + 'LICENSE',
  'LICENSE-elysia.txt': elysia + 'LICENSE',
  'LICENSE-programming-languages-logos.txt': 'https://raw.githubusercontent.com/abranhe/programming-languages-logos/e1be48ad2dffe3e6e0e24fdefa9e740167fb2315/license',
})) {
  await writeFile(new URL(filename, destination), await download(url));
}
await writeFile(new URL('sources.json', destination), JSON.stringify(sources, null, 2) + '\n');
