# Elemental Naught

Elemental Naught is a synchronous dynamic HTML generator that will run on the client or the server.

## Usage

Usage of E0 is explained with an example:

```js
import { $ } from '@faranalytics/elemental';

//  Create an HTML template.
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
                        $('li')('Menu Item 1'),
                        $('li')('Menu Item 2'),
                        $('li')('Menu Item 3'),
                    )
                )
            ),
            $('main', { class: 'main' })(
                $('h1', { id: 'heading' })(),
                $('br'),
                $('div', { 'id': 'main-content' })(),
                $('div')(
                    "More static content."
                )
            ),
            $('footer')(
                "The Footer."
            ),
            $('script')()
        )
    )
)

//  Now, easily inject dynamic content into the template:
let html = template({ 
    'heading': $('span')('A dynamic heading.'),
    'main-content': $('div')("The main dynamic content.") 
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
        <div id="main-content">
            <div>The main dynamic content.</div>
        </div>
        <div>More static content.</div>
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