# Multitenancy Management
A [JHipster](http://jhipster.github.io/) module to enable multitenancy in your application

Multitenancy management provides you with the out of the box functionality that you need to make your application multitenanted. This module provides the ability to easily provision new tenants, the division between all tenants and their data, and the ongoing administration required to manage a multitenanted application.

##Problem
Implement a common multi tenant architecture can be time consuming. Regular concerns regarding the smooth provisioning of tenant, the partitioning of data, and the management of user roles and permissions are common to all projects and as a result are a common overhead.

##Solution
Multitenancy management seamlessly integrates with your JHipster application to immediately provide you with a range frontend views, api endpoints, and domain objects required to fulfill all the common workflows of a multitenanted application. This module provides options on how you want to fulfill core use cases within your application such as customer registration, consumer licensing, and tenant theming.

##Getting Started

As this is a [JHipster](http://jhipster.github.io/) module, you need to have JHipster and its related tools already installed.

```bash
npm install -g generator-jhipster-multitenancy
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

