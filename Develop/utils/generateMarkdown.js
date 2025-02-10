// If there is no title, return an empty string
function renderTitle(title) {
  if(!title) return ``;

  return `# ${title}\n\n`;
}

// If there is no description, return an empty string
function renderDescription(description) {
  if(!description) return '';

  return `## Description\n\n${description}\n\n`;
}

// If there is no installation, return an empty string
function renderInstallation(installation) {
    if(!installation) return '';
    
    return `## Installation\n\n${installation}\n\n`;
}

// If there is no usage, return an empty string
function renderUsage(usage) {
  if(!usage) return '';
  
  return `## Usage\n\n${usage}\n\n`;
}

// If there is no installation, return an empty string
function renderCredits(credits) {
  if(!credits) return ``;
  
  return `## Credits\n\n${credits}\n\n`;
}

// If there is no license, return an empty string
function renderLicenseBadge(badges, license, index) {
  if(license==='none') return '';
  
  const badge= badges[index];

  return `![${license}](${badge})\n\n`;
}
// 
// If there is no license, return an empty string
function renderLicenseLink(licenses, license, index) {
  if(license === 'none') return '';

  const lic = licenses[index];

  return `This application is covered under the [${license}](${lic})\n\n`;

}

// If there is no license, return an empty string
function renderLicenseSection(license, names, badges, licenses) {
  if(license === 'none') return '';

  return `## License\n\n`;
}

// If there is no features, return an empty string
function renderFeatures(features) {
  if(!features) return ``;
  
  return `## Features\n\n${features}\n\n`;
}

// If there is no how, return an empty string
function renderHow(how) {
  if(!how) return``;
  
  return `## How to Contribute\n\n${how}\n\n`;
}

// If there is no tests, return an empty string
function renderTests(tests, toc) {
  if(!tests) return ``;
  
  return `## Tests\n\n${tests}\n\n`;
}

//render the Questions Section if renders based off of the inputs for github username and email, if neither were provided the section is ommitted.  Otherwise the content is rendered
// based off of the data provided.
function renderQuestionsSection(github, email){
  if(!github && !email) return ``;

  let temp = `## Questions\n\n`
  temp += `if you have any questions feel free to use the links below.\n\n`;

  if(github) temp += `[GitHub](https://github.com/${github})\n\n`;
  if(email) temp +=  `[${email}](mailto:${email})\n\n`;
  return temp
}

//This function dynamically creates the table of contents for the README.md file.  It adds the links for sections if a section contains any information.
function renderTableofContents(data){
  let temp = `## Table of Contents\n\n`;
  if(data.installation) temp += `- [Installation](#installation)\n`;
  if(data.usage) temp += `- [Usage](#usage)\n`;
  if(data.credits) temp += `- [Credits](#credits)\n`;
  if(data.license) temp +=`- [License](#license)\n`;
  if(data.features) temp += `- [Features](#features)\n`;
  if(data.how) temp += `- [How to Contribute](#how-to-contribute)\n`  
  if(data.tests) temp += `- [Tests](#tests)\n`
  if(data.github || data.email) temp += '- [Questions](#questions)\n'  
  temp += `\n`;
  return temp;
}

//Generates the README.md contents,  section by section.  If there was no data for a particular section the section is ommitted.
 
function generateMarkdown(data, names, badges, licenses) {
  const index = names.indexOf(data.license);
  let temp = renderTitle(data.title);
  temp += renderLicenseBadge(badges, data.license, index);
  temp += renderDescription(data.description);
  temp += renderTableofContents(data);
  temp += renderInstallation(data.installation);
  temp += renderUsage(data.usage);
  temp +=renderCredits(data.credits);
  temp += renderLicenseSection(data.license);

  temp += renderLicenseLink(licenses, data.license, index);
  temp += renderFeatures(data.features);
  temp += renderHow(data.how);
  temp += renderTests(data.tests);
  temp += renderQuestionsSection(data.github, data.email);
  
  return temp
}

export default generateMarkdown;
