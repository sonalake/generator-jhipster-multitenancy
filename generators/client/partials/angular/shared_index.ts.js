const file = (context) => {
    return `${context.webappDir}app/shared/index.ts`;
};

const tmpls = [
    {
        type: 'rewriteFile',
        target: (context) => {
            return `export * from './util/datepicker-adapter';`;
        },
        tmpl: (context) => {
            return `export * from './${context.tenantNameLowerFirst}/${context.tenantNameLowerFirst}.service';`;
        }
    },
]

module.exports = {
    file,
    tmpls
};