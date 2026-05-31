import {
    defineConfig
}
from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    timeout: 60000,

    expect: {

        timeout: 10000
    },

    fullyParallel: false,

    reporter: [

        ['list'],
        ['html']
    ],

    use: {

        headless: false,
        trace:
            'retain-on-failure'
    }
});