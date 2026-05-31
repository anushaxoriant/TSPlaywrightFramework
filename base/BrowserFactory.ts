import {
    chromium,
    firefox,
    webkit,
    Browser
}
from '@playwright/test';

import { config }
    from '../utils/config';

export class BrowserFactory {

    static async launchBrowser()
    : Promise<Browser> {

        const browserOptions = {

            headless:
                config.headless,

            slowMo:
                config.demoMode
                ? 1000
                : 0,

            args: [
                '--start-maximized'
            ]
        };

        switch (
            config.browser
        ) {

            case 'firefox':

                return await firefox
                    .launch(
                        browserOptions
                    );

            case 'webkit':

                return await webkit
                    .launch(
                        browserOptions
                    );

            default:

                return await chromium
                    .launch(
                        browserOptions
                    );
        }
    }
}