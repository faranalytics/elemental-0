export function $(name: string, attr?: { [key: string]: string }) {

    let tag = '<' + name;
    if (attr) {
        let ks = Object.keys(attr);
        for (let i = 0; i < ks.length; i++) {
            let v = attr[ks[i]];
            let ev = '';
            for (let i = v.length; i--;) {
                let c = v[i];
                if (c == '&') {
                    ev = '&amp;' + ev;
                }
                else if (c == '<') {
                    ev = '&lt;' + ev;
                }
                else if (c == '>') {
                    ev = '&gt;' + ev;
                }
                else if (c == '"') {
                    ev = '&quot' + ev;
                }
                else {
                    ev = c + ev;
                }
            }
            tag = tag + ' ' + ks[i] + '="' + ev + '"';
        }
    }

    tag = tag + '>';

    return function outer(...args: Array<typeof inner | typeof outer | string>): typeof inner {

        function inner(activate: { [key: string]: string }, et:boolean=false): string {

            if (activate && attr) {
                if (attr.hasOwnProperty('id') && activate.hasOwnProperty(attr['id'])){
                    args.unshift(activate[attr['id']]);
                    delete activate[attr['id']];
                }
            }

            for (let i = 0; i < args.length; i++) {
                let arg = args[i];
                if (typeof arg == 'function') {
                    if (arg.name == 'outer') {
                        tag = tag + ((arg as typeof outer)() as typeof inner)(activate, false);
                    }
                    else if (arg.name == 'inner') {
                        tag = tag + (arg as typeof inner)(activate, true);
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

        return inner;
    }
}