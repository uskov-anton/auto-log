const debug = require('debug');

const Class = require('./lib/class');
const Function = require('./lib/function');
const Method = require('./lib/method');

const getLogWrapper = (type = '') => {
    switch(type.toLowerCase()) {
        case 'class' :
            return Class;

        case 'func' :
        case 'function' :
        case 'functions' :
            return Function;

        case 'method' :
        case 'methods' :
            return Method;
        
        default :
            throw new Error('Invalid type. Available: class, function, method');
    }
};

const preprocess = debug('Autologger:preprocess');
const postprocess = debug('Autologger:postprocess');

const Autologger = (opt = {}) => (type = '') => {
    const wrapper = getLogWrapper(type);

    return (logger = {}) => {
        const wrap = wrapper(logger);
    
        return (...arg) => {
            opt.preprocess 
                ? opt.preprocess(type, ...arg)
                : preprocess(`[${type}]`, ...arg);
    
            const result = wrap(...arg);

            opt.postprocess
                ? opt.postprocess(type, result)
                : postprocess(`[${type}] %o`, result);
    
            return result;
        };
    };
};

module.exports = Autologger;
