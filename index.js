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

const Autologger = (opt = {}) => (type = '') => {
    const wrapper = getLogWrapper(type);

    return (logger = {}) => {
        const wrap = wrapper(logger);
    
        return (...arg) => {
            opt.preprocess && opt.preprocess(type, ...arg);
    
            const result = wrap(...arg);

            opt.postprocess && opt.postprocess(type, result);
    
            return result;
        };
    };
};

module.exports = Autologger;
