## disc usage
Total: 41M
- aws-sdk:  41M

## Documents
- aws-sdk API reference: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/

## Notes
- promisify: use `.promise()` instead of callBack function
- apply IAM role(with 'AdministratorAccess') to EC2, otherwise `CredentialsError: Missing credentials in config`
    - Console -> Service: EC2 -> select an instance -> `Actions` -- `Instance Settings` -- `Attach/Replace IAM Role`
- s3 bucket name only accept lowercase 
## TODO
