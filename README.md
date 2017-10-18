# generator-jhipster-multitenancy
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module to enable multitenancy in your application

<div>
    <a href="http://jhipster.github.io">
        <img src="https://github.com/sonalake/generator-jhipster-multitenancy/raw/master/images/logo-jhipster.png">
    </a>
</div>

# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is intended to be applied to a JHipster application. This module is used to:

- Generate a Tenant entity and a relationship to the User entity
- Tenantise existing entities
- Enhance `yo jhipster:entity` sub-generator with a post-hook

# Table of contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
  * [Tenantising an entity](#tenantising-an-entity)
  * [Applying the tenant filter](#applying-the-tenant-filter)
* [License](#license)

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

# Installation

If you are using Yarn:

```bash
# install the module
yarn global add generator-jhipster-multitenancy

# update the module
yarn global upgrade generator-jhipster-multitenancy
```

If you are using npm:

```bash
#install the module
npm install -g generator-jhipster-multitenancy

# update the module
npm update -g generator-jhipster-multitenancy
```

# Usage

After installation, run the module on a JHipster generated application:

```bash
yo jhipster-multitenancy
```

You will then be prompted for the name of your tenant entity.

## Tenantising an entity

Once the module has been run on the JHipster generated application, any entity in the application can then be tenantised. This is done using the `jhipster-multitenancy:entity` sub-generator.

To tenantise an existing entity:

```bash
yo jhipster-multitenancy:entity foo
```

This sub-generator also hooks into the `jhipster:entity` sub-generator. When creating a new entity, you will be prompted to tenantise the new entity.

```bash
yo jhipster:entity foo

# upon generation, you will be asked
Do you want to tenantise the entity foo? (Y/n)
```

## Applying the tenant filter

In order to achieve multitenancy we have chose a discriminator column approach. To apply data filtering by tenant, add @FilterDef and @Filter annotations to the top of each tenantised entity.

```bash
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

/**
 * A book.
 */
@Entity
@Table(name = "book")
@FilterDef(name = "COMPANY_FILTER", parameters = {@ParamDef(name = "companyId", type = "long")})
@Filter(name = "COMPANY_FILTER", condition = "company_id = :companyId")
public class Book extends AbstractAuditingEntity implements Serializable {
    ...
}
```
This example is based on company being the tenant name, and the filter then being name "COMPANY_FILTER". Copy these lines from User.java to ensure no mistakes in filter reference.

# License

Apache-2.0 © [Sonalake](http://github.com/sonalake/)

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-multitenancy.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-multitenancy
[travis-image]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy.svg?branch=master
[travis-url]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy
[daviddm-image]: https://david-dm.org/sonalake/generator-jhipster-multitenancy.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sonalake/generator-jhipster-multitenancy
