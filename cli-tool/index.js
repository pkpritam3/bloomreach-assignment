#! /usr/bin/env node

const request = require('request');
const fs = require('fs');

const baseURL = process.env.BASE_URL || 'http://localhost:3005';
const filePath = process.env.FILE_PATH || '../file-system/commit.txt';

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's the searchTerm?`, searchTerm => {

  request(`${baseURL}/search/commits?q=${searchTerm}&per_page=1`, { json: true }, async (err, res, body) => {
    if (err) { return console.log(err); }

    if (body.items.length > 0) {
      const buffer = Buffer.from(JSON.stringify(body.items));

      try {
        await fs.promises.writeFile(filePath, buffer);
        console.log('File is created successfully.');
      } catch (error) {
        console.error('Error', error);
      }

    } else {
      console.log('No data found');
    }
  });
  readline.close();
});

