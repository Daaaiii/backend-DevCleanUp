const swaggerAutogen = require('swagger-autogen')();
const packageJson = require('../package.json');

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes.js']; 
const doc = {
    info: {
        version:packageJson.version,      
        title: packageJson.name,     
        description: packageJson.description 
    },
    
};

swaggerAutogen(outputFile, endpointsFiles, doc);