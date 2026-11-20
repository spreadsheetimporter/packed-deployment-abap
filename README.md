# UI5 Application com.spreadsheetimporter.centraltest

This UI5 Application enables a packaged deployment of the UI5 Spreadsheet Importer to use as central deployed component.

## Description



## Requirements

Either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for dependency management.

You can use this concept in multiple ways:

- create your own app and use the same concept as here
- clone/fork the repo and change according to your needs
- use the app as is and only change config

## Preparation

Use `npm` to install the dependencies:

```sh
npm install
```

## Deploy the app

1. change .env file to your needs

Copy the `.envTEMPLATE` and rename it to `.env`. Add your credentials to the file.

2. Change the ui5-deploy.yaml file to your needs

Copy `ui5-deployTEMPLATE.yaml` file and rename to `ui5-deploy.yaml` and change the following values to your needs:

- target url
- target client
- app name
- app description
- app package
- app transport

3. Deploy the app

Execute the following command to build and deploy the app:

```sh
npm run deploy
```

## Update local deployed apps

**It is recommended to start with this sample app to deploy the Spreadsheet Importer to your local server.**

### Using this app

When you executed the above steps, you can create a new app in your own git server.  
Commit your changes (like the new deploy yaml) and then push to your git server.  
If a new version of this app is available, you can update your local deployed app.

You then have to git remotes like `origin` and `local`.  
When you want to update your local deployed app, you can execute the following command:

```sh
git pull origin main # pull the latest changes from the repo
npm install # install the latest dependencies including the newest versions of spreadsheetimporter
npm run deploy # deploy the app to your local server
git push local main # push the changes to your local git server
```

### Only using this as basis

Alternatively you can use the `node addNewVersion.js` command to only update the relevant lines in the `package.json` and `manifest.json` files.

````sh
node addNewVersion.js
git commit -am "update version"
git push local main
````




## License

The deployment application uses the [Apache License 2.0](LICENSE). Each embedded UI5 Spreadsheet Importer retains its release license.

- 0.34.x and 1.x — Apache 2.0
- 2.0.0 and 2.1.0 — [commercial license](webapp/licenses/SpreadsheetImporter-2.0.0-and-2.1.0.txt)
- 2.2.0 — [commercial license](webapp/licenses/SpreadsheetImporter-2.2.0.txt)
- 2.3.0 — [commercial license](webapp/licenses/SpreadsheetImporter-2.3.0.txt)
- 2.4.0 — [commercial license](webapp/licenses/SpreadsheetImporter-2.4.0.txt)
- 2.5.0 — Apache 2.0, including for production use. The component includes its own `LICENSE` and `THIRD-PARTY-NOTICES.txt` in its versioned directory.

The files in `webapp/licenses/` reproduce the commercial terms from the corresponding UI5 release tags for offline reference.
