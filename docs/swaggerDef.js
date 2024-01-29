const { version, name } = require('../package.json');
const config = require('../config/config');

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: name,
        version,
        // license: {
        //     name: 'MIT',
        //     url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
        // },
    },
    servers: [
        {
            //url: `http://3.131.116.215:${config.port}/v1`,
            url: `http://localhost:${config.port}/v1`,
        },
    ],
};



module.exports = swaggerDef;