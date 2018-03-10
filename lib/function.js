const { isAsync } = require('../utils');


function apply(target, context, arg) {
    const { before, after } = this;

    before && before({ 
        target, 
        context, 
        arg,
    });

    const result = target.apply(context, arg);

    after && after(result, {
        target, 
        context, 
        arg,
    });

    return result;
};

const applySync = logger => (...arg) => apply.apply(logger, arg);
const applyAsync = logger => async (...arg) => apply.apply(logger, arg);

const Function = (logger = {}) => target => new Proxy(target, {
    apply: isAsync(target) ? applyAsync(logger) : applySync(logger),
});

module.exports = Function;
