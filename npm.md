
## `package.json` syntax
- Consider also setting `"private": true` to prevent accidental publication.


## npm cli
- `npm publish`
    - npm version increment: https://docs.npmjs.com/cli/version
    - npm user: `npm login`,  `npm whoami`
    - [npmjs.com] `cannot be republished until 24 hours have passed.` after `unpublish` action
        - https://stackoverflow.com/questions/48661199/error-on-updating-packages-in-npm
- npm install private package in docker image: https://docs.npmjs.com/docker-and-private-modules
- there is no automatic way to manage npm token explicitly
- try [github package registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry)
- [bump all dependencies to latest](https://stackoverflow.com/questions/16073603/how-to-update-each-dependency-in-package-json-to-the-latest-version)
    - `npm outdated` will list out all latest versions of your dependencies
    - `npm update` will do the update

## Tools
- [npm包热度对比网站](https://www.npmtrends.com/)
