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

let html = template({ 
    'heading': $('span')('A dynamic heading.'),
    'main-content': $('div')("The main dynamic content.") 
}, null);

console.log(html)
