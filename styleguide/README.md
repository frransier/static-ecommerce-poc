# aggressive-koala (version 1.2.1)
Front end framework including a boilerplate (folder structure, basic files, gulp setup etc) and style guide.

## What is Aggressive Koala?
Aggressive Koala is a framework providing a foundation for fast and uniform front end development.

## The purpose of Aggressive Koala
Historically, we at Wipcore have created projects more or less without any general development guidelines. Each developer has incorporated their own style and solutions based on their preferences and experiences, meaning no project looks like the other neither in structure or code. This has led to negatives, for example has new developers had a hard time knowing how to work and a lot of development time has been spent on reinventing basic things as there's been a great lack of reusable code.

**In short, the main purposes of Aggressive Koala are to cut down development time and create a uniform way of working.** This is done by providing an out of the box work environment with all basic features in place, [a library of reusable components](http://bitter.wipcore.se), and guidelines for project setup, work flow and code writing.

## Getting started
### Requirements
* [Node.js v9.5.0](https://nodejs.org)
* [NPM package manager](https://www.npmjs.com) (>= 5)

### Basic installation
* Fork or download the master repository to your local enviroment
* Open package.json and change the properties (more detailed info below).
__Important note: The name property in package.json is used by Gulp to name the CSS and JS bundle files!__
* Open your project folder in a command prompt/terminal and run ``npm install`` to install all dependencies.

#### Edit package.json ####
All properties that already are placed in package.json, except for devDependencies, _should_ be edited in package.json. Though, **the properties that are _required_ to include are name and version** which together makes the project unique. Also, internally we require that author and/or contributors are applied.
The name is used by Aggressive Koala to name the bundle CSS and JS files. It shall only contain lowercase letters and _ or - as special characters!
Versioning shall follow the [Semantic Versioning pattern](http://semver.org/): Major.Minor.Patch. The versioning starts at 0.1.0 during the development phase and becomes a 1.0.0 version when there's a production release of the project.

Below is a minimalistic example of package.json (excluding the devDependencies) extended with the contributors property.

    {
        "name": "",
        "version": "0.1.0",
        "author": {
            "name": "",
            "email": ""
        },
        "contributors": [
            {
                "name": "",
                "email": ""
            }
        ]
    }

Read more about package.json and its properties at the [NPM website](https://docs.npmjs.com/files/package.json).

### Commands
    npm start
Use this command to start developing with Aggressive Koala.

    npm run build:dev
Builds and bundles files using development settings but do not start any servers or such.

    npm run build:prod
Use this command to build the project optimized for production use.
__Important:__ This command will create minified css and js files with the suffix .min and you will need to make sure these files are requested instead of the development files. For example, change the src in the <link> tag to request aggressive-koala.min.css instead of aggressive-koala.css.

    npm run publish
Creates a static export of the style guide.

## Resources
* [Aggressive Koala Wiki](https://github.com/Wipcore/aggressive-koala/wiki)
* [Global components library](http://bitter.wipcore.se/)
* [Issues](https://github.com/Wipcore/aggressive-koala/issues)

Changelog is found in changelog.md.
