const fs = require('fs');
const semver = require('semver');

const npmPackageName = 'ui5-cc-spreadsheetimporter';
const minDesiredVersion = '0.34.0';
const manifestFile = './webapp/manifest.json';
const packageFile = './package.json';

async function fetchPackageVersions(packageName) {
  const url = `https://registry.npmjs.org/${packageName}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch package versions: ${response.status}`);
  }

  const packageData = await response.json();
  return Object.keys(packageData['versions']); 
}

function updateJsonFile(filePath, pathToValue, newValue) {
  const fileData = JSON.parse(fs.readFileSync(filePath));

  // Clearing existing content if pathToValue leads to an array or object
  if (pathToValue.includes('.') && (Array.isArray(fileData[pathToValue.split('.')[0]]) || typeof fileData[pathToValue.split('.')[0]] === 'object')) {
    const parts = pathToValue.split('.');
    let obj = fileData;
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = newValue; 
  } else {
    // Direct assignment for simple property updates
    fileData[pathToValue] = newValue; 
  }

  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2)); 
}

async function main() {
  try {
    const availableVersions = await fetchPackageVersions(npmPackageName);
    const validVersions = availableVersions.filter(v => semver.satisfies(v, `>=${minDesiredVersion}`));

    if (validVersions.length === 0) {
      console.log('No versions found matching the desired criteria.');
      return;
    }

    // Update package.json
    let packageJsonData = JSON.parse(fs.readFileSync(packageFile));
    packageJsonData.dependencies = {}; // Clear existing dependencies
     
    for (const version of validVersions) {
      packageJsonData.dependencies[`ui5-cc-spreadsheetimporter-${version.replaceAll('.', '-')}`] = `npm:ui5-cc-spreadsheetimporter@${version}`;
    }
    fs.writeFileSync(packageFile, JSON.stringify(packageJsonData, null, 2));

    // Update manifest.json
    let manifestJsonData = JSON.parse(fs.readFileSync(manifestFile));
    manifestJsonData["sap.app"].embeds = []; // Clear existing embeds
    manifestJsonData["sap.ui5"].dependencies.components = {}; // Clear existing components

    for (const version of validVersions) {
      const versionKey = version.replaceAll('.', '_');
      manifestJsonData["sap.app"].embeds.push(`thirdparty/customcontrol/spreadsheetimporter/v${versionKey}`);
      manifestJsonData["sap.ui5"].dependencies.components[`cc.spreadsheetimporter.v${versionKey}`] = {};
    }
    fs.writeFileSync(manifestFile, JSON.stringify(manifestJsonData, null, 2)); 

    console.log('Files updated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
