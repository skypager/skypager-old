# Repl Module Specification

This is runnable test documentation for any javascript module that wants to act as a `Repl`

```javascript
// provider will be a part of the
const { configure } = provider
```

## Specs

### A Configure method is required

```javascript
configure.should.be.a('function')
```
