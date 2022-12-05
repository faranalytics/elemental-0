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
                        "More content."
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

let html = template({'main-content': "Main content."});

console.log(html)
