const Function = require('./function');

const Method = logger => (_, __, descriptor) => ({
    ...descriptor,
    value: Function(logger)(descriptor.value),
});

module.exports = Method;
