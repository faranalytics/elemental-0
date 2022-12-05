import { $ } from '@faranalytics/elemental';


let template = $('!DOCTYPE html')(
    $('html')(
        $('head')(
            $('title', { id: 'title', class: 'title' })('The Title.')
        ),
        $('body')(
            $('main', { id: 'main' })(
                $('h1')(
                    "Heading"
                ),
                $('br'),
                $('div')(
                    $('div')("Some content.")
                ),
                $('footer')(
                    "The Footer."
                ),
            ),
            $('script')()
        )
    )
)



let html = template();

console.log(html)
