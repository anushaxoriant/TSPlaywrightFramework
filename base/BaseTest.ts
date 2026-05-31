import {
    test,
    Browser,
    BrowserContext,
    Page
}
from '@playwright/test';

import { BrowserFactory }
    from './BrowserFactory';

import { Logger }
    from '../utils/Logger';

import { config }
    from '../utils/config';

export class BaseTest {

    static browser: Browser;

    static context: BrowserContext;

    static page: Page;
}

// =========================================
// BEFORE ALL
// =========================================

test.beforeAll(async () => {

    Logger.info(
        'ONETIMESETUP - Starting Suite'
    );

    BaseTest.browser =
        await BrowserFactory
            .launchBrowser();

    Logger.info(
        'Browser Launched Successfully'
    );
});

// =========================================
// BEFORE EACH
// =========================================

test.beforeEach(async () => {

    Logger.info(
        'SETUP - Creating Context and Page'
    );

    BaseTest.context =
        await BaseTest.browser
            .newContext({

            viewport: null
        });

    BaseTest.page =
        await BaseTest.context
            .newPage();

    await BaseTest.page.goto(
        config.baseUrl
    );

    Logger.info(
        'Application Opened Successfully'
    );
});

// =========================================
// AFTER EACH
// =========================================

test.afterEach(async ({ }, testInfo) => {

    Logger.info(
        `TEARDOWN - ${testInfo.title}`
    );

    if (
        testInfo.status !==
        testInfo.expectedStatus
    ) {

        await BaseTest.page
            .screenshot({

            path:
            `screenshots/${testInfo.title}.png`,

            fullPage: true
        });

        Logger.error(
            `Test Failed:
            ${testInfo.title}`
        );
    }

    await BaseTest.page.close();

    await BaseTest.context.close();

    Logger.info(
        'Page Closed Successfully'
    );
});

// =========================================
// AFTER ALL
// =========================================

test.afterAll(async () => {

    Logger.info(
        'ONETIMETEARDOWN - Closing Browser'
    );

    await BaseTest.browser.close();

    Logger.info(
        'Browser Closed Successfully'
    );
});