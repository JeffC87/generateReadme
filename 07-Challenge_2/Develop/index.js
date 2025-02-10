// TODO: Include packages needed for this application
import {readFile, writeFile} from 'fs/promises';
import inquirer from 'inquirer';
import generateMarkdown from './utils/generateMarkdown.js';


const {prompt} = inquirer;

// TODO: Create an array of questions for user input
let questions = [
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
      },
      {
        type: 'input',
        message: '\nProvide a short description explaining the what, why, and how of your project.  Use the following questions as a guide:\n\n\t- What was your motivation?\n\t- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")\n\t- What problem does it solve?\n\t- What did you learn?\n\n',
        name: 'description',
      },
      {
        type: 'input',
        message: '\nWhat are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.\n',
        name: 'installation',
      },
      {
        type: 'input',
        message: '\nProvide instructions and examples for use. Include screenshots as needed.\n',
        name: 'usage',
      },
      {
        type: 'input',
        message: '\nList your collaborators, if any, with links to their GitHub profiles.\nIf you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.\nIf you followed tutorials, include links to those here as well.\n',
        name: 'credits'
      },
];

let obj =[];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    writeFile(fileName, data, 'utf8');
}

// TODO: Create a function to initialize app
function init() {

    readFile('./assets/parsed.json', 'utf8').then((data) => {
        obj = JSON.parse(data);
        const names = obj.map(({name}) => name.trim());
        const badges = obj.map(({badge}) => badge);
        const licenses = obj.map(({license}) => license);
        names.push('none');

        
        let question = {
            type: 'list', 
            message: '\nThe last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).\nChoose a license from this list or select none for no license:',
            name: 'license',
            choices: names,
        };

        questions.push(question);

        question = {
            type: 'input',
            message: '\nIf your project has a lot of features, list them here.\n',
            name: 'features'
        };

        questions.push(question);

        question = {
            type: 'input',
            message: `\nIf you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant(https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.\n`,
            name: 'how'
        };

        questions.push(question);

        question = {
            type: 'input',
            message: '\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.\n',
            name: 'tests'
        };

        questions.push(question);

        question = {
            type: 'input',
            message: '\nWhat is your GitHub username?\n',
            name: 'github'
        };

        questions.push(question);

        question = {
            type: 'input',
            message: '\nWhat is your preferred email to be reached at for questions?\n',
            name: 'email'
        };

        questions.push(question);

        inquirer
        .prompt(questions)
            .then((response) => {
            const output = (generateMarkdown(response, names, badges, licenses));
            writeToFile('./output/README.md',  output);
            console.log('Finished.  Your README.md file is in the output folder.');
        })
            
        
    });

}


// Function call to initialize app
init();

