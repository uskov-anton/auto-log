const Method = require('../lib/method');
const { isAsync } = require('../utils');


describe('Check autologger/method', () => {
    test('is a function', () => {
        expect(typeof Method).toBe('function');
        expect(typeof Method()).toBe('function');
    });

    const autologger = Method();

    describe('target - sync class method', () => {
        const result = { foo: { bar: null } };

        class Example {
            @autologger
            target() {
                return result;
            }
        }

        const example = new Example();

        test('logged target is a function', () => {
            expect(typeof example.target).toBe('function');
        });

        test('logged target is a sync function', () => {
            expect(
                isAsync(example.target)
            ).toBeFalsy();
        });

        test('result of the logged target is equal to the result of the target', () => {
            expect(example.target()).toBe(result);
        });
    });

    describe('target - async class method', () => {
        const result = { foo: { bar: null } };

        class Example {
            @autologger
            async target() {
                return result;
            }
        }

        const example = new Example();

        test('logged target is a function', () => {
            expect(typeof example.target).toBe('function');
        });

        test('logged target is a async function', () => {
            expect(
                isAsync(example.target)
            ).toBeTruthy();
        });

        test('result of the logged target is equal to the result of the target', async () => {
            expect(await example.target()).toBe(result);
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
