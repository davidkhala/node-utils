# [Lerna](https://lerna.js.org/) toolset

## Install
`npm install --global lerna`

## CheatSheet
- `lerna init`
    - it may upgrade an existing repo to the current version of Lerna.
    - `--independent/-i` – Use independent versioning mode.
- `lerna clean`  
    - removing any node_modules directories under package locations.
    - to skip confirmation as force, use flat `--yes`
-  `lerna bootstrap`
    - Installing all their dependencies and linking any cross-dependencies.
    - **WARN** It will not install dependencies on root itself
- `lerna run [script]`
    - Run an npm script in each package that contains that script.
- `lerna publish`
    - [independent mode] guiding wizard to provide each package version strategy 

## TODO
- fix
    ```
    npm ci
    npm ERR! cipm can only install packages with an existing package-lock.json or npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or later to generate it, then try again.

    ```
