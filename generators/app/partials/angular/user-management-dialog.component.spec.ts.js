const tmpl = context => `const accountValues = {
                            firstName: 'John',
                            lastName: 'Doe',
                            activated: true,
                            email: 'john.doe@mail.com',
                            langKey: 'en',
                            login: 'john'
                        };
                        comp.currentAccount = accountValues;`;

module.exports = {
    tmpl
};
