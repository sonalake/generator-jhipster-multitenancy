const tmpl = (context) => {
    let template =`const accountValues = {
                firstName: 'John',
                lastName: 'Doe',
                activated: true,
                email: 'john.doe@mail.com',
                langKey: 'en',
                login: 'john'
            };
            comp.currentAccount = accountValues;`;

    return template;
};

module.exports = {
    tmpl
};

