const { expressjwt: expressJwt } = require('express-jwt');

require('dotenv').config();

function authJwt() {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: async (req, payload) => {
            try {
                if (!payload || !payload.payload.isAdmin) {
                    return true;
                }
                return false;
            } catch (error) {
                return true; // Consider handling the error appropriately
            }
        }
    }).unless({
        path: [
            // Define routes that don't require authentication here
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/sellers\/(.*)/, methods: ['post'] },
            '/users/login',
            '/users/register',
            '/sellers/login'
        ]
    });
}




module.exports = authJwt;
// module.exports.sellerPostOnly = sellerPostOnly;

