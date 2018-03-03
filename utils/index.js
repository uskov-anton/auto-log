module.exports = {
    isAsync: target => Object.prototype.toString.call(target) === '[object AsyncFunction]',
};