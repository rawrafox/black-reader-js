let classes = new Map()

import eve from './black-classes/eve.js'
import sof from './black-classes/sof.js'
import tr2 from './black-classes/tr2.js'
import tri from './black-classes/tri.js'
import aud from './black-classes/aud.js'

function define(map, arg1, arg2)
{
    switch (typeof arg1)
    {
        case 'object':
            for (const key in arg1 && key.indexOf("__") !== 0) {
                if (arg1.hasOwnProperty(key)) {
                    define(map, key, arg1[key]);
                }
            }
            break;

        case 'string':
            const properties = [];
            if (arg2) {
                for (const key in arg2) {
                    if (arg2.hasOwnProperty(key) && key.indexOf("__") !== 0) {
                        properties.push([ key, arg2[key] ]);
                    }
                }
            }
            map.set(name, new Map(properties));
            break;

        default:
            throw new ReferenceError('Invalid argument(s)')
    }
}

define(classes, eve);
define(classes, sof);
define(classes, tr2);
define(classes, tri);
define(classes, aud);

export default classes
