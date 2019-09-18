const file = (context) => {
    return `${context.webappDir}app/core/user/account.model.ts`;
};

const tmpls = [
    {
        type: 'rewriteFile',
        target: (context) => {
            return `public imageUrl: string`;
        },
        tmpl: (context) => {
            return `public company: string,`;
        }
    },
]

module.exports = {
    file,
    tmpls
};