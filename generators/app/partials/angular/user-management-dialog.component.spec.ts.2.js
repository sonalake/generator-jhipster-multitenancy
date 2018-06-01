const tmpl = context => `const accountValues = {
                            firstName: 'John',
                            lastName: 'Doe',
                            activated: true
                        };
                        comp.currentAccount = accountValues;`;

module.exports = {
    tmpl
};
