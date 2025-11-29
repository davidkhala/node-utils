/**
 * @type {string[]} minVersion: set the minimum TLS version to allow. Cannot be specified along with the secureProtocol option.
 * It is not recommended to use less than TLSv1.2.
 * Default: 'TLSv1'
 * Introduced in Node.js 11
 */
const minVersions = ['TLSv1', 'TLSv1.1', 'TLSv1.2'];
/**
 *
 * @type {string[]} secureProtocol The TLS protocol version to use.
 * The possible values are listed as [SSL_METHODS](https://www.openssl.org/docs/man1.1.0/man7/ssl.html#Dealing-with-Protocol-Methods), use the function names as strings.
 * It is not recommended to use TLS versions less than 1.2.
 * Default: none.
 */
const secureProtocols = [
    'TLS_method',
    'TLS_client_method',
    'TLS_server_method',
    'TLSv1_2_method',
    'TLSv1_2_client_method',
    'TLSv1_2_server_method',
    'TLSv1_1_method',
    'TLSv1_1_client_method',
    'TLSv1_1_server_method',
    'TLSv1_method',
    'TLSv1_client_method',
    'TLSv1_server_method',
    'SSLv3_method',
    'SSLv3_client_method',
    'SSLv3_server_method'
];

export const httpsOptions = {
    minVersion: minVersions,
    secureProtocol: secureProtocols
};