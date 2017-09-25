# Command Module Specification

This is runnable test documentation for any javascript module that wants to act as a `Command`

```javascript
// provider will be a part of the
const { configure } = provider
```

## Specs

### A Configuration method is required

```javascript
configure.should.be.a('function')
```
