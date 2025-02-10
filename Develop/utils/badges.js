import {readFile} from 'fs/promises';
readFile('../assets/parsed.json', 'utf8').then((theText) => {
    console.log(JSON.parse(theText));
});
