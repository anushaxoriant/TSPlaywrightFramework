import {
    defineConfig
}
from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    timeout: 60000,

    reporter: [

        ['list'],

        ['allure-playwright']
    ],

    use: {

        headless: false,

        trace:
            'retain-on-failure'
    }
});