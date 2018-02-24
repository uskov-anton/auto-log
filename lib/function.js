const apply = ({
    before,
    after,
}) => (target, context, arg) => {
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

const Function = logger => target => new Proxy(target, {
    apply: apply(logger),
});

module.exports = Function;
