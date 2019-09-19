const file = context => `${context.webappDir}app/core/user/account.model.ts`;

const tmpls = [
    {
        type: 'rewriteFile',
        target: 'public imageUrl: string',
        tmpl: 'public company: string,'
    }
];

module.exports = {
    file,
    tmpls
};
