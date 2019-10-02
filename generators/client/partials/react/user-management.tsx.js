const file = context => `${context.webappDir}app/modules/administration/user-management/user-management.tsx`;
const tmpls = [
    {
        type: 'rewriteFile',
        regex: true,
        target: context => '<th /><th className="hand" onClick={sort("langKey")}>',
        tmpl: context => '<th className="hand"><Translate contentKey="jhipsterApp.company.detail.title"></Translate></th>'
    },
    {
        type: 'rewriteFile',
        regex: true,
        target: context => '<td>{user.activated ?',
        tmpl: context => '<td>{user.company["name"]}</td>'
    }
];

module.exports = {
    file,
    tmpls
};
