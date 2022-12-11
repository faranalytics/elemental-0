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
                $('div', {'id':'date'})(),
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
);

//  Now, inject dynamic content into the template by tag id.
let html = template({
    'main-content': "The main dynamic content.",
    'date': Date(),
    'engines': $('option', { 'value': 'Elemental naught', 'selected': true })("Elemental naught"),
    'heading': $('span')('A dynamic heading.'),
});

console.log(html);
