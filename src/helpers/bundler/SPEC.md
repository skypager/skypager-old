# Bundler Module Specification

This is runnable test documentation for any javascript module that wants to act as a `Bundler`

```javascript
// provider will be a part of the
const { run, configure, watch } = provider
```

## Specs

### A Configuration method is required

```javascript
configure.should.be.a('function')
```
