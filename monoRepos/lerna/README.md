# [Lerna](https://lerna.js.org/) toolset

## Install
`npm install --global lerna`

## CheatSheet
- `lerna init`
    - it may upgrade an existing repo to the current version of Lerna.
    - `--independent/-i` – Use independent versioning mode.
    - `--no-ci` use `npm install` instead of `npm ci`(the latter requires package-lock.json or npm-shrinkwrap.json with lockfileVersion >= 1)
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

## Notes
- config npm scripts `"install": "lerna bootstrap --no-ci"` will introduce problem
    - when another node project use this package as dependency, the packaged will be installed by running its `npm install` command 
      ```
      > khala-fabric-sdk-node@1.4.6-0.0.1 install ...
      > lerna bootstrap --no-ci
      ``` 
      

## TODO

