## disc usage
Total: 41M
- aws-sdk:  41M

## Notes
- promisify: use `.promise()` instead of callBack function
- apply IAM role(with 'AdministratorAccess') to EC2, otherwise `CredentialsError: Missing credentials in config`
    - Console -> Service: EC2 -> select an instance -> `Actions` -- `Instance Settings` -- `Attach/Replace IAM Role` 
## TODO
- 