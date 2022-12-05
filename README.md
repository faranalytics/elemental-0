# Elemental-0

Elemental naught is a synchronous dynamic HTML generator that will run on the client or the server.

## Usage

Usage of E-0 is explained with an example:

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
                $('div', { id: 'main-content' })(
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

The formatted HTML is:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title id="title" class="title">The Title.</title>
</head>

<body>
    <main id="main">
        <h1>Heading 1</h1><br>
        <div id="main-content">Main dynamic content.<div>More static content.</div>
        </div>
    </main>
    <footer>The Footer.</footer>
    <script></script>
</body>

</html>
```