# Elemental-0

Elemental naught is a dynamic HTML generator that can be used client-side or server-side.

## Usage

Usage of E-0 is explained by an example:

```js
import { $ } from '@faranalytics/elemental';

let template = $('!DOCTYPE html')(
    $('html')(
        $('head')(
            $('title', { id: 'title', class: 'title' })(
                "The Title."
            )
        ),
        $('body')(
            $('main', { id: 'main' })(
                $('h1')(
                    "Heading 1"
                ),
                $('br'),
                $('div', { 'id': 'main-content' })(
                    $('div')(
                        "More static content."
                    )
                ),
                $('footer')(
                    "The Footer."
                ),
            ),
            $('script')()
        )
    )
)

let html = template({'main-content': "Main dynamic content."});
```

The resulting HTML is:

```html
<!DOCTYPE html>
<html>

<head>
    <title id="title" class="title">The Title.</title>
</head>

<body>
    <main id="main">
        <h1>Heading 1</h1><br>
        <div id="main-content">Main dynamic content.<div>More static content.</div>
        </div>
        <footer>The Footer.</footer>
    </main>
    <script></script>
</body>

</html>
```