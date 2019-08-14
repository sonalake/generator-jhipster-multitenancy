<div>
    <a href="http://jhipster.github.io">
        <img src="https://github.com/sonalake/generator-jhipster-multitenancy/raw/master/images/logo-jhipster.png">
    </a>
</div>
Greetings, Java Hipster!

# generator-jhipster-multitenancy
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![License](http://img.shields.io/:license-apache-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)
> A JHipster blueprint for creating multitenant applications

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this blueprint:

```bash
npm install -g generator-jhipster-multitenancy
```

To update this blueprint:

```bash
npm update -g generator-jhipster-multitenancy
```

## With Yarn

To install this blueprint:

```bash
yarn global add generator-jhipster-multitenancy
```

To update this blueprint:

```bash
yarn global upgrade generator-jhipster-multitenancy
```

# Usage

To use this blueprint, run the below command

```bash
jhipster --blueprint multitenancy2
```


## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally 

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
cd multitenancy2
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

You could also use Yarn for this if you prefer

```bash
cd generator-jhipster
npm link

cd multitenancy2
npm link generator-jhipster
```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-multitenancy
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jhipster -d --blueprint multitenancy2

```

# License

Apache-2.0

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-multitenancy.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-multitenancy
[travis-image]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy.svg?branch=master
[travis-url]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy
[daviddm-image]: https://david-dm.org/sonalake/generator-jhipster-multitenancy.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sonalake/generator-jhipster-multitenancy
