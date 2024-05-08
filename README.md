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



## License

This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
