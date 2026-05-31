import {
    Page,
    Locator
}
from '@playwright/test';

import { BasePage }
    from '../base/BasePage';

export class LoginPage
    extends BasePage {

    private usernameInput: Locator;

    private passwordInput: Locator;

    private loginButton: Locator;

    private inventoryContainer: Locator;

    constructor(
        page: Page
    ) {

        super(page);

        this.usernameInput =
            page.locator('#user-name');

        this.passwordInput =
            page.locator('#password');

        this.loginButton =
            page.locator('#login-button');

        this.inventoryContainer =
            page.locator('.inventory_list');
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.fill(
            this.usernameInput,
            username
        );

        await this.fill(
            this.passwordInput,
            password
        );

        await this.click(
            this.loginButton
        );
    }

    async isInventoryPageLoaded()
    : Promise<boolean> {

        await this.page.waitForURL(
            '**/inventory.html'
        );

        return await this.isVisible(
            this.inventoryContainer
        );
    }
}