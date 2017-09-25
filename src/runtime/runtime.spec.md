# Skypager Runtime

A Skypager Runtime can be produced from any Skypager Project, or
it can be generated on its own.

## Setup

```javascript
const runtime = project.createTestSubject()
```

## Specs

### mixes in the lodash object and chain methods

```javascript
runtime.should.have.property('mapValues').that.is.a('function)
runtime.should.have.property('mapKeys').that.is.a('function')
runtime.should.have.property('chain')
```

### has a middleware system

```javascript
runtime.should.have.property('use').that.is.a('function)
runtime.should.have.property('start').that.is.a('function')
```

### has some property utils

```javascript
runtime.should.have.property('hide').that.is.a('function)
runtime.should.have.property('lazy').that.is.a('function')
runtime.should.have.property('applyInterface').that.is.a('function')
```

### has a registry system

```javascript
runtime.should.have.property('registries')
  .that.has.property('lookup').that.is.an('function').and
  .that.has.property('register').that.is.an('function')
```

### has a helpers registry
