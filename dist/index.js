const attributeName = /^[^\u{0000}-\u{001f}\u{0022}\u{0027}\u{003e}\u{002f}\u{003d}\u{e000}-\u{f8ff}\u{f0000}-\u{ffffd}]+$/u;
const attributeValue = /^[^\u{0000}-\u{0008}\u{000b}\u{000e}-\u{001F}\u{e000}-\u{f8ff}\u{f0000}-\u{ffffd}]*$/u;
const tagName = /^[\u{0030}-\u{0039}\u{0061}-\u{007A}\u{0041}-\{005A}]+$/ui;
const preamble = /^!DOCTYPE +html/i;
const wrapper = Symbol('wrap');
const activator = Symbol('activate');
function attrToString(attr) {
    let names = Object.keys(attr);
    let attrStr = '';
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        if (!name.match(attributeName)) {
            throw new Error(`The attribute name named ${name} does not match the regular expression ${attributeName.toString()}.`);
        }
        let value = attr[name];
        if (typeof value == 'string') {
            attrStr = attrStr + ' ' + name + '="';
            if (!value.match(attributeValue)) {
                throw new Error(`The attribute value of ${value} does not match the regular expression ${attributeValue.toString()}.`);
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
            attrStr = attrStr + '"';
        }
        else if (typeof value == 'boolean' && value === true) {
            attrStr = attrStr + ' ' + name;
        }
    }
    return attrStr;
}
export function $(_name, _attr) {
    const [name, attr] = arguments;
    const isPreamble = name.match(preamble);
    if (!name.match(tagName) && !isPreamble) {
        throw new Error(`The tag or preamble named ${name} matches neither the regular expression ${tagName.toString()} nor the regular expression ${preamble.toString()}.`);
    }
    let tag = '<' + name;
    if (attr && typeof attr == 'object') {
        tag = tag + attrToString(attr);
    }
    const startTag = tag + '>';
    function wrap(..._args) {
        function activate(selector, hasEndTag = true) {
            /** Do not mutate args. **/
            const args = [..._args];
            let part = '';
            if (selector && attr) {
                if (attr.hasOwnProperty('id') && selector.hasOwnProperty(attr['id'])) {
                    args.unshift(selector[attr['id']]);
                    delete selector[attr['id']];
                }
            }
            for (let i = 0; i < args.length; i++) {
                let arg = args[i];
                if (typeof arg == 'function') {
                    if (arg.hasOwnProperty(wrapper)) {
                        part = part + arg()(selector, false);
                    }
                    else if (arg.hasOwnProperty(activator)) {
                        if (isPreamble) {
                            hasEndTag = false;
                        }
                        part = part + arg(selector, true);
                    }
                }
                else if (typeof arg == 'string') {
                    part = part + arg;
                }
                else {
                    throw new Error(`An invalid argument of type ${typeof arg} was encountered.`);
                }
            }
            if (!hasEndTag) {
                return startTag + part;
            }
            else {
                return startTag + part + '</' + name + '>';
            }
        }
        return Object.defineProperty(activate, activator, {
            value: null,
            writable: false,
            configurable: false
        });
    }
    return Object.defineProperty(wrap, wrapper, {
        value: null,
        writable: false,
        configurable: false
    });
    ;
}
