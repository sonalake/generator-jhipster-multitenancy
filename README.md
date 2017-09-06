# Multitenancy Management
A [JHipster](http://jhipster.github.io/) module to enable multitenancy in your application

Multitenancy management provides you with the out of the box functionality that you need to make your application multitenanted. This module provides the ability to easily provision new tenants, the division between all tenants and their data, and the administration required to manage a multitenanted application.

Multitenancy management will provide hibernate filtering on the backend to enforce data partitioning. The rules of this filtering will be based on the users role. On the frontend, the module will come with a suite of views to provide tenant provisioning, and tenant user management.

##Getting Started

As this is a [JHipster](http://jhipster.github.io/) module, you need to have JHipster and its related tools already installed.

```bash
npm install -g generator-jhipster-multitenancy

# To update this module
npm update -g generator-jhipster-module
```

To run this generator in your local environment, run the command below. This will refresh, if you make any changes.

```bash
cd generator-jhipster-multitenancy
npm link
```

## Running

Then run the module on a JHipster generated application:

```bash
yo jhipster-multitenancy
```

