import {
    Page,
    Locator
}
from '@playwright/test';

import { BasePage }
    from '../base/BasePage';

export class InventoryPage
    extends BasePage {

    private backpackButton: Locator;

    private cartBadge: Locator;

    private cartLink: Locator;

    constructor(
        page: Page
    ) {

        super(page);

        this.backpackButton =
            page.locator(
                '#add-to-cart-sauce-labs-backpack'
            );

        this.cartBadge =
            page.locator(
                '.shopping_cart_badge'
            );

        this.cartLink =
            page.locator(
                '.shopping_cart_link'
            );
    }

    async addItemToCart()
    : Promise<void> {

        await this.click(
            this.backpackButton
        );
    }

    async openCart()
    : Promise<void> {

        await this.click(
            this.cartLink
        );

        await this.page.waitForURL(
            '**/cart.html'
        );
    }

    async isCartBadgeDisplayed()
    : Promise<boolean> {

        return await this.isVisible(
            this.cartBadge
        );
    }
}