
import { BaseWidget, Component } from 'czm-sdk'

@Component({
    tagName: 'my-test',
    className: 'my-test',
    template: `
    <div>
        <h1>My Test</h1>
    </div>
    `
})

export default class MyTest extends BaseWidget {
    constructor() {
        super()
        console.log('Test')
    }

    async afterInit() {
        console.log('my test after init', this.viewer)
    }
}