exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    
    specs: ['T01-rapeLoadData.js' , 'T02-rapeCreateData.js'],
    
    capabilities: {
        'browserName' : 'phantom.js'
    }
    
};