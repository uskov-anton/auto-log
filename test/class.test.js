const Class = require('../lib/class');


describe('Check autologger/class', () => {
    test('is a function', () => {
        expect(typeof Class).toBe('function');
        expect(typeof Class()).toBe('function');
    });

    const autologger = Class();

    describe('target - class', () => {
        class Target {}
        const LoggedTarget = autologger(Target);

        test('logged target is a function', () => {
            expect(typeof LoggedTarget).toBe('function');
        });

        test('constructor of the logged target is equal to the target', () => {
            expect(LoggedTarget.prototype.constructor).toBe(Target);
        });

        test('logged target is a class', () => {
            expect(LoggedTarget.prototype.constructor.toString().indexOf('class')).toBe(0);
        });

        test('an instance of the logged class is equal to an instance of the class', () => {
            expect(new LoggedTarget()).toBeInstanceOf(Target);
        });
    });

    describe('target - function', () => {
        const Target = function(){};
        const LoggedTarget = autologger(Target);

        test('logged target is a function', () => {
            expect(typeof LoggedTarget).toBe('function');
        });

        test('constructor of the logged target is equal to the target', () => {
            expect(LoggedTarget.prototype.constructor).toBe(Target);
        });

        test('logged target is not a class', () => {
            expect(LoggedTarget.prototype.constructor.toString().indexOf('class')).toBe(-1);
        });

        test('an instance of the logged class is equal to an instance of the class', () => {
            expect(new LoggedTarget()).toBeInstanceOf(Target);
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
