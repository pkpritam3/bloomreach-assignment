const fs = require('fs');
const fsPromises = fs.promises;

const diff = require('deep-diff');
// { kind: 'N' } for new key additions
// { kind: 'E' } for edits
// { kind: 'D' } for deletions


const filePath = '../file-system/commit.txt';

async function readFile(f_Path) {
    try {
        const data = await fsPromises.readFile(f_Path, { encoding: 'utf8' });
        return data;
    } catch (err) {
        console.error('Error occured while reading directory!', err);
    }
}

async function getStats(f_Path) {
    try {
        const data = await fsPromises.stat(f_Path);
        return data;
    } catch (err) {
        console.error('Error occured while Getting stats!', err);
    }
}

async function start() {
    let currObj = null;
    currObj = await readFile(filePath);
    
    fs.watch(filePath, async (eventType, filename) => {
        console.log('\nThe file', filename, 'is modified!');

        newObj = await readFile(filePath);
        const differences = diff(currObj, newObj);
        console.log('Differences:', differences);
        currObj = newObj;

        const stats = await getStats(filePath);
        console.log(`Last Modified: ${stats.mtime}`);
    });
}

start();




