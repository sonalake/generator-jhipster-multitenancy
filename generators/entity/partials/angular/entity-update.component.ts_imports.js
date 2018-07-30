const tmpl = (context) => {
    let template =`import { ${context.tenantNameUpperFirst} } from '../../admin/${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.model';
import { ${context.tenantNameUpperFirst}Service } from '../../shared/${context.tenantNameLowerFirst}/${context.tenantNameLowerFirst}.service';
import { Principal} from 'app/core';`;

    return template;
};

module.exports = {
    tmpl
};