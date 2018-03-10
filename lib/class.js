const construct = ({
    before,
    after,
}) => (target, arg) => {
    before && before({ 
        target, 
        arg, 
    });

    const result = new target(...arg);

    after && after(result, { 
        target, 
        arg, 
    });

    return result;
};

const Class = (logger = {}) => target => new Proxy(target, {
    construct: construct(logger),
});

module.exports = Class;
