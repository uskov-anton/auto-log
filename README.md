# autologger

Javascript utility for automatic logging of functions and classes.

## Install

```bash
$ npm install autologger --save
```

## Usage

```js
const Autolog = require('autologger');

const autolog = Autolog(options)(type)(logger);

let target = autolog(target);
```

|Variable|Type|Required|
|--------|----|--------|
|options|object|no|
|type|string|yes|
|logger|object|yes|
|target|function or class|yes|

### options

Logs the wrapping of a variable by an automatic logger. Must contain two properties:

|Properties|Type|Required|
|----------|----|--------|
|preprocess|function|no|
|postprocess|function|no|

### type

The type of the variable to which automatic logging is applied. One of the following values:
- class
- function
- method

### logger

Logs the call steps. Must contain two properties:

|Properties|Type|Required|
|----------|----|--------|
|before|function|yes|
|after|function|yes|

### target

The function or class to which automatic logging will be applied.

## Example

### Logger

```js
const logger = {
    before: console.log,
    after: console.log,
};
```

### Function

```js
const autolog = Autolog()('function')(logger);

let example = autolog(function example() { /* ... */ });
```

### Class

```js
const autolog = Autolog()('class')(logger);

let Example = autolog(class Example {
    /* ... */
});
```

#### with decorators
> [see js decorators](https://github.com/wycats/javascript-decorators)

```js
const autolog = Autolog()('class')(logger);

@autolog
class Example {
    /* ... */
}
```

### Class method

```js
const autolog = Autolog()('method')(logger);

class Example {
    @autolog
    test() { /* ... */ }
}
```

## License

This project is licensed under [MIT](LICENSE).
