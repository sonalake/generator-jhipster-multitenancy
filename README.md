<div>
    <a href="http://jhipster.github.io">
        <img src="https://github.com/sonalake/generator-jhipster-multitenancy/raw/master/images/logo-jhipster.png">
    </a>
</div>
Greetings, Java Hipster!

# generator-jhipster-multitenancy
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![License](http://img.shields.io/:license-apache-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)
> A JHipster module for creating multitenant applications


# Introduction
This module is used for creating multitenant applications. The module will:

 - Generate a Tenant entity.
 - Make the User, and any other entities, tenant aware.

# Table of contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
  * [Tenantising an entity](#tenantising-an-entity)
  * [Making an entity tenant aware](#making-an-entity-tenant-aware)
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

## Making an entity tenant aware

Once the module has been run on the JHipster generated application, any entity in the application can be made tenant aware. This is done using the `jhipster-multitenancy:entity` sub-generator.

For an existing entity:

```bash
yo jhipster-multitenancy:entity Book
```

This sub-generator also hooks into the `jhipster:entity` sub-generator. When creating a new entity, you will be prompted to make an entity tenant aware.

```bash
yo jhipster:entity Book

# upon generation, you will be asked
Do you want to make Book tenant aware? (Y/n)
```

## Applying the tenant filter

Tenancy is enforced using a Hibernate filter. The filter identifies a discriminator column that is used to used to uniquely identify a tenant. By default, jhipster-multitenancy adds the filter to the `User` class. For other entities, you must add the filter manually. See below for an example.

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

# License

Apache-2.0

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-multitenancy.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-multitenancy
[travis-image]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy.svg?branch=master
[travis-url]: https://travis-ci.org/sonalake/generator-jhipster-multitenancy
[daviddm-image]: https://david-dm.org/sonalake/generator-jhipster-multitenancy.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sonalake/generator-jhipster-multitenancy
