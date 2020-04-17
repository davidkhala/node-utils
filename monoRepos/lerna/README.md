# [Lerna](https://lerna.js.org/) toolset

## Install
`npm install --global lerna`

## CheatSheet
- `lerna init`
    - it may upgrade an existing repo to the current version of Lerna.
    - `--independent/-i` – Use independent versioning mode.
- `lerna clean`  
    - removing any node_modules directories under package locations.
-  `lerna bootstrap`
    - Installing all their dependencies and linking any cross-dependencies.
- `lerna run [script]`
    - Run an npm script in each package that contains that script.
- `lerna publish`
    - [independent mode] guiding wizard to provide each package version strategy 

