# Elemental naught

Elemental naught is a synchronous dynamic HTML generator that will run on the client or the server.

## Usage

Usage of E0 is explained with an example:

```js
import { $ } from '@faranalytics/elemental';

let template = $('!DOCTYPE html')(
    $('html', { 'lang': 'en' })(
        $('head')(
            $('title', { id: 'title', class: 'title' })(
                "The Title."
            )
        ),
        $('body')(
            $('header')(
                $('nav', { class: 'main' })(
                    $('ul')(
                        $('li')("Menu Item 1"),
                        $('li')("Menu Item 2"),
                        $('li')("Menu Item 3"),
                    )
                )
            ),
            $('main', { class: 'main' })(
                $('h1', { id: 'heading' })(),
                $('br'),
                $('div', { 'id': 'main-content' })(),
                $('div')(
                    "Some static content."
                ),
                $('label', { 'for': 'engines' })("Choose an engine."),
                $('select', { 'id': 'engines' })(
                    $('option', { 'value': 'Template Engines', 'selected': false })(
                        "Template Engines"
                    )
                )
            ),
            $('footer')(
                "The Footer."
            ),
            $('script')()
        )
    )
)

let html = template({
    'engines': $('option', { 'value': 'Elemental naught', 'selected': true })("Elemental naught"),
    'heading': $('span')('A dynamic heading.'),
    'main-content': "The main dynamic content."
}, null);

console.log(html)
```

The formatted HTML is:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title id="title" class="title">The Title.</title>
</head>

<body>
    <header>
        <nav class="main">
            <ul>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
            </ul>
        </nav>
    </header>
    <main class="main">
        <h1 id="heading"><span>A dynamic heading.</span></h1><br>
        <div id="main-content">The main dynamic content.</div>
        <div>Some static content.</div><label for="engines">Choose an engine.</label><select id="engines">
            <option value="Elemental naught" selected>Elemental naught</option>
            <option value="Template Engines">Template Engines</option>
        </select>
    </main>
    <footer>The Footer.</footer>
    <script></script>
</body>

</html>
```

## Install
```bash
npm i elemental-0
```

## Aspirations
### Implement a subset of CSS selectors.
E0 presently only supports injecting content at a given id name.