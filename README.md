# generator-jhipster-multitenancy
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module to enable multitenancy in your application

**Note:** This module does not support Angular 1 yet and hence will not work if you are using JHipster 4 with Angular1.

## Usage

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

### Installation

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have [JHipster and its related tools already installed](http://jhipster.github.io/installation.html).

This module requires Jhipster version greater than 3.0 in order to work

### Install With Yarn

To install this module:

```bash
yarn global add generator-jhipster-multitenancy
```

To update this module:

```bash
yarn global upgrade generator-jhipster-multitenancy
```

### Install With NPM

To install this module:

```bash
npm install -g generator-jhipster-multitenancy
```

To update this module:

```bash
npm update -g generator-jhipster-multitenancy
```

###Running The module

After installation, run the module on a JHipster generated application:

```bash
yo jhipster-multitenancy
```

###Tenantising an entity

Once the module has been run on the JHipster generated application, any entity in the application can then be tenantised.

To tenantise an new entity as it is being created:

```bash
yo jhipster:entity foo

//upon generation, you will be asked
Do you want to tenantise the entity foo? (Y/n)
```

To tenantise an existing entity:

```bash
yo jhipster-multitenancy:entity foo
```

## License


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-multitenancy.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-multitenancy
[travis-image]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy.svg?branch=master
[travis-url]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy
[daviddm-image]: https://david-dm.org/mairead_mccabe/generator-jhipster-multitenancy.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mairead_mccabe/generator-jhipster-multitenancy
