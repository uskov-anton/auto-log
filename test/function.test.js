const Function = require('../lib/function');
const { isAsync } = require('../utils');


describe('Check autologger/function', () => {
    test('is a function', () => {
        expect(typeof Function).toBe('function');
        expect(typeof Function()).toBe('function');
    });

    const autologger = Function();

    describe('target - sync function', () => {
        const result = { foo: { bar: null } };
        const loggedTarget = autologger(function(){
            return result;
        });

        test('logged target is a function', () => {
            expect(typeof loggedTarget).toBe('function');
        });

        test('result of the logged target is equal to the result of the target', () => {
            expect(loggedTarget()).toBe(result);
        });
    });

    describe('target - async function', () => {
        const result = { foo: { bar: null } };
        const loggedTarget = autologger(async function(){
            return result;
        });

        test('logged target is a async function', () => {
            expect(
                isAsync(loggedTarget)
            ).toBeTruthy();
        });

        test('result of the logged target is equal to the result of the target', async () => {
            expect(await loggedTarget()).toBe(result);
        });
    });

    describe('target - method of function prototype', () => {
        const Target = function(){};
        const result = { foo: { bar: null } };

        Target.prototype.method = autologger(() => result);

        test('logged target is a function', () => {
            expect(typeof Target.prototype.method).toBe('function');
        });

        test('result of the logged target is equal to the result of the target', () => {
            expect(new Target().method()).toBe(result);
        });
    });

    describe('throw for target', () => {
        const types = {
            'undefined': undefined,
            'null': null,
            'boolean': true,
            'string': '',
            'number': 1,
            'infinity': Infinity,
            'nan': NaN,
            'symbol': Symbol(),
        };

        Object.keys(types).forEach(type => {
            test(type, () => {
                expect(() => {
                    autologger(types[type]);
                }).toThrow();
            });
        });
    });
});
