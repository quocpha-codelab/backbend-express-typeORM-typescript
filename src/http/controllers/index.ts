/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname)
  .filter((file: string) => file.indexOf('.') !== 0 && file !== 'index.ts')
  .forEach((file: string) => {
    const controller = require(path.join(__dirname, file));
    module.exports = controller;
  });
