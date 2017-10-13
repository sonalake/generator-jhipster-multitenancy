const tmpl = (context) => {
    let template =`import { ${context.tenantNameUpperFirst} } from '../../admin/${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.model';
import { ${context.tenantNameUpperFirst}Service } from '../../admin/${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.service';
import { ResponseWrapper } from '../../shared';`;

    return template;
};

module.exports = {
    tmpl
};