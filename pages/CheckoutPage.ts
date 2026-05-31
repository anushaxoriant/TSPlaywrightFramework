import {
    Page,
    Locator
}
from '@playwright/test';

import { BasePage }
    from '../base/BasePage';

export class CheckoutPage
    extends BasePage {

    private firstName: Locator;

    private lastName: Locator;

    private postalCode: Locator;

    private continueButton: Locator;

    private finishButton: Locator;

    private completeHeader: Locator;

    constructor(
        page: Page
    ) {

        super(page);

        this.firstName =
            page.locator('#first-name');

        this.lastName =
            page.locator('#last-name');

        this.postalCode =
            page.locator('#postal-code');

        this.continueButton =
            page.locator('#continue');

        this.finishButton =
            page.locator('#finish');

        this.completeHeader =
            page.locator('.complete-header');
    }

    async checkout()
    : Promise<void> {

        await this.fill(
            this.firstName,
            'Anusha'
        );

        await this.fill(
            this.lastName,
            'Shivaram'
        );

        await this.fill(
            this.postalCode,
            '560001'
        );

        await this.click(
            this.continueButton
        );

        await this.page.waitForURL(
            '**/checkout-step-two.html'
        );

        await this.click(
            this.finishButton
        );

        await this.page.waitForURL(
            '**/checkout-complete.html'
        );
    }

    async isOrderSuccessful()
    : Promise<boolean> {

        return await this.completeHeader
            .filter({
                hasText:
                'Thank you for your order!'
            })
            .isVisible();
    }
}