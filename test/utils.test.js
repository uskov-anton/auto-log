const utils = require('../utils');

describe('Check utils', () => {
    describe('isAsync', isAsync);
});

function isAsync() {
    describe('Function', () => {
        test('async function(){}    is checked as asynchronous', () => {
            expect(utils.isAsync(
                async function() {}
            )).toBeTruthy();
        });

        test('function(){}          is not checked as asynchronous', () => {
            expect(utils.isAsync(
                function() {}
            )).toBeFalsy();
        });
    });

    describe('Arrow function', () => {
        test('async () => {}        is checked as asynchronous', () => {
            expect(utils.isAsync(
                async () => {}
            )).toBeTruthy();
        });

        test('() => {}              is not checked as asynchronous', () => {
            expect(utils.isAsync(
                () => {}
            )).toBeFalsy();
        });
    });
    
    describe('Object method', () => {
        const obj = {
            async asyncMethod() {},
            syncMethod() {},
        };

        test('async method(){}      is checked as asynchronous', () => {
            expect(utils.isAsync(
                obj.asyncMethod
            )).toBeTruthy();
        });
        
        test('method(){}            is not checked as asynchronous', () => {
            expect(utils.isAsync(
                obj.syncMethod
            )).toBeFalsy();
        });
    });
    
    describe('Class method', () => {
        class Class {
            async asyncMethod(){}
            syncMethod(){}
        }

        const cls = new Class();

        test('async method(){}      is checked as asynchronous', () => {
            expect(utils.isAsync(
                cls.asyncMethod
            )).toBeTruthy();
        });
        
        test('method(){}            is not checked as asynchronous', () => {
            expect(utils.isAsync(
                cls.syncMethod
            )).toBeFalsy();
        });
    });
}