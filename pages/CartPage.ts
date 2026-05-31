import {
    Page,
    Locator
}
from '@playwright/test';

import { BasePage }
    from '../base/BasePage';

export class CartPage
    extends BasePage {

    private checkoutButton: Locator;

    private backpackLabel: Locator;

    constructor(
        page: Page
    ) {

        super(page);

        this.checkoutButton =
            page.locator('#checkout');

        this.backpackLabel =
            page.locator(
                '.inventory_item_name'
            );
    }

    async clickCheckout()
    : Promise<void> {

        await this.click(
            this.checkoutButton
        );

        await this.page.waitForURL(
            '**/checkout-step-one.html'
        );
    }

    async isBackpackDisplayed()
    : Promise<boolean> {

        return await this.backpackLabel
            .filter({
                hasText:
                'Sauce Labs Backpack'
            })
            .isVisible();
    }
}