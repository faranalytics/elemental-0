const attributeName = /^[^\u{0000}-\u{001f}\u{0022}\u{0027}\u{003e}\u{002f}\u{003d}\u{e000}-\u{f8ff}\u{f0000}-\u{ffffd}]+$/u
const attributeValue = /^[^\u{0000}-\u{0008}\u{000b}\u{000e}-\u{001F}\u{e000}-\u{f8ff}\u{f0000}-\u{ffffd}]*$/u

function attrToString(attr: { [key: string]: string }){

        let names = Object.keys(attr);
        let attrStr = '';
        for (let i = 0; i < names.length; i++) {

            let name = names[i];

            if (!name.match(attributeName)){
                throw new Error(`The attribute name ${name} does not match ${attributeName.toString()}.`);
            }

            attrStr = attrStr + ' ' + name + '="';

            let value = attr[name];
            if (!value.match(attributeValue)) {
                throw new Error(`The attribute value ${value} does not match ${attributeValue.toString()}.`);
            }

            for (let i = 0; i < value.length; i++) {
                let char = value[i];
                if (char == '&') {
                    attrStr = attrStr + '&amp;';
                }
                else if (char == '<') {
                    attrStr = attrStr + '&lt;';
                }
                else if (char == '>') {
                    attrStr = attrStr + '&gt;';
                }
                else if (char == '"') {
                    attrStr = attrStr + '&quot;';
                }
                else {
                    attrStr = attrStr + char;
                }
            }
            attrStr = attrStr  + '"';
        }

        return attrStr;
    }

export function $(name: string, attr?: { [key: string]: string }) {

    let tag = '<' + name;

    if (attr && typeof attr == 'object') {
        tag = tag + attrToString(attr);
    }

    tag = tag + '>';

    function elemental(...args: Array<typeof elemental | typeof activate | string>): typeof activate {

        function activate(selector: { [key: string]: string }, et: boolean | null = true): string {

            if (selector && attr) {
                if (attr.hasOwnProperty('id') && selector.hasOwnProperty(attr['id'])) {
                    args.unshift(selector[attr['id']]);
                    delete selector[attr['id']];
                }
            }

            for (let i = 0; i < args.length; i++) {
                let arg = args[i];
                if (typeof arg == 'function') {
                    if (arg.name == 'elemental') {
                        tag = tag + ((arg as typeof elemental)() as typeof activate)(selector, null);
                    }
                    else if (arg.name == 'activate') {
                        tag = tag + (arg as typeof activate)(selector, true);
                    }
                }
                else if (typeof arg == 'string') {
                    tag = tag + args[i];
                }
            }

            if (!et) {
                return tag;
            }
            else {
                return tag + '</' + name + '>';
            }
        }

        return activate;
    }

    return elemental;
}