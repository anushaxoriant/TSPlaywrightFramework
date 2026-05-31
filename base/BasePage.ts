import {
    Page,
    Locator
}
from '@playwright/test';

export class BasePage {

    protected page: Page;

    constructor(
        page: Page
    ) {

        this.page = page;
    }

    async click(
        locator: Locator
    ): Promise<void> {

        await locator.highlight();

        await this.page.waitForTimeout(
            500
        );

        await locator.click();

        await this.page.waitForTimeout(
            1000
        );
    }

    async fill(
        locator: Locator,
        text: string
    ): Promise<void> {

        await locator.click();

        await locator.pressSequentially(
            text,
            {
                delay: 120
            }
        );

        await this.page.waitForTimeout(
            1000
        );
    }

    async isVisible(
        locator: Locator
    ): Promise<boolean> {

        return await locator.isVisible();
    }
}