# [Github npm registry](npm.pkg.github.com)


To publish multiple packages to the same repository, you can include the URL of the GitHub repository in the repository field of the package.json file for each package. GitHub Packages will match the repository based on that field, instead of based on the package name. If you store the package.json file outside the root directory of your repository, you can use the directory field to specify the location where GitHub Packages can find the package.json files.
```json
"repository" : {
    "type" : "git",
    "url": "ssh://git@github.com/OWNER/REPOSITORY.git",
    "directory": "packages/name"
  },
```


## Use a [.npmrc](./.npmrc) file
 It prevents other developers from accidentally publishing the package to npmjs.org instead of GitHub Packages.

`registry=https://npm.pkg.github.com/<OWNER> `

**Note: upper case letters aren't supported in `<OWNER>`, please toLowerCase() before assign one**
