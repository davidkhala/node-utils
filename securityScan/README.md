## Static scanner
- [njsscan](https://github.com/ajinabraham/njsscan#command-line-options)
    - install `pip install njsscan`
    - ```
      usage: njsscan [-h] [--json] [-o OUTPUT] [--missing-controls] [-v]
                     [path [path ...]]
      
      positional arguments:
        path                  Path can be file(s) or directories with source code
      
      optional arguments:
        -h, --help            show this help message and exit
        --json                set output format as JSON
        -o OUTPUT, --output OUTPUT
                              output filename to save the result
        --missing-controls    enable missing security controls check
        -v, --version         show njsscan version
      ```
