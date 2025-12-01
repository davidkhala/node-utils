import jwt from 'jsonwebtoken'

describe('jwt', function () {
    this.timeout(0)

    it('sample', async () => {

        const token = jwt.sign({userId: 123}, 'secret', {expiresIn: '1h'});
        const decoded = jwt.verify(token, 'secret');
        console.log(decoded);
    })
    it('supabase', async () => {
        const secret = 'your-super-secret-jwt-token-with-at-least-32-characters-long'
        const anonToken = jwt.sign({role: 'anon'}, secret);

        const serviceToken = jwt.sign({role: 'service_role'}, secret);

        console.log('Anon Token:', anonToken);
        console.log('Service Role Token:', serviceToken);
        console.log('verify:', jwt.verify(serviceToken, secret));
    })
})