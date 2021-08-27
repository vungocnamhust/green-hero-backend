import fs from 'fs';

const routes = async (app: any) => {
  const fileNames = fs.readdirSync('src/routes');
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    if (fileName !== 'index.ts' && ['ts'].indexOf(fileName.split('.').pop()) !== -1) {
      const route = await import(`./${fileName}`);
      app.use('/api/v1/', route.default);
    }
  }
};

export default routes;
