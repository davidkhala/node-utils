
## `package.json` syntax
- Consider also setting `"private": true` to prevent accidental publication.
- There is a forgoten command option can format the package.json. Alternatively, use `npx format-package -w`


## npm cli
- `npm publish`
    - npm version increment: https://docs.npmjs.com/cli/version
    - npm user: `npm login`,  `npm whoami`
    - [npmjs.com] `cannot be republished until 24 hours have passed.` after `unpublish` action
        - https://stackoverflow.com/questions/48661199/error-on-updating-packages-in-npm
    - [npmjs.com] To publish package like `@davidkhala/myPack` to public, use
        - `npm publish --access public`
        - https://docs.npmjs.com/creating-and-publishing-scoped-public-packages#publishing-scoped-public-packages
- `npm install`
    - how to install private package in docker image: https://docs.npmjs.com/docker-and-private-modules
    - [WARN] npm config global `--global`, `--local` are deprecated. Use `npm i --location=global` instead.
- there is no automatic way to manage npm token explicitly
- try [github package registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry)
- [bump all dependencies to latest](https://stackoverflow.com/questions/16073603/how-to-update-each-dependency-in-package-json-to-the-latest-version)
    - `npm outdated` will list out all latest versions of your dependencies
    - `npm update` will do the update
- `npm deprecate <package-name>@<version> "<deprecation message>"`
    - To undeprecate a package, replace "\<deprecation message\>" with "" (an empty string)
- `npm create` is an alias, for `npm init`
    - This was done using npm 6.10.1+.
    - [`npm create ${package-name}` is a shorthand for running: `npx create-${package-name}`](https://stackoverflow.com/a/76870223/4229693)

## Tools
- [npm包热度对比网站](https://www.npmtrends.com/)
