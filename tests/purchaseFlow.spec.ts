import {
    test,
    expect
}
from '@playwright/test';

import '../base/BaseTest';

import { BaseTest }
    from '../base/BaseTest';

import { LoginPage }
    from '../pages/LoginPage';

import { InventoryPage }
    from '../pages/InventoryPage';

import { CartPage }
    from '../pages/CartPage';

import { CheckoutPage }
    from '../pages/CheckoutPage';

import { config }
    from '../utils/config';

import { Logger }
    from '../utils/Logger';

    test.setTimeout(
    60000
);

test.describe(
    'TypeScript Playwright Framework',
    () => {

    test(
        'TC_1: Verify Login',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST: Login Validation'
        );

        try {

            const loginPage =
                new LoginPage(page);

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            await test.step(
                'Validate inventory page',
                async () => {

                expect(
                    await loginPage
                        .isInventoryPageLoaded()
                ).toBeTruthy();
            });

            Logger.info(
                'AFTER TEST: Login Successful'
            );
        }
        catch (error: any) {

            Logger.error(
                `Verify Login Failed:
                ${error.message}`
            );

            throw error;
        }
    });

    test(
        'TC_2: Verify Add Backpack To Cart',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST: Add Backpack'
        );

        try {

            const loginPage =
                new LoginPage(page);

            const inventoryPage =
                new InventoryPage(page);

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            await test.step(
                'Add backpack to cart',
                async () => {

                await inventoryPage
                    .addItemToCart();
            });

            await test.step(
                'Validate cart badge',
                async () => {

                expect(
                    await inventoryPage
                        .isCartBadgeDisplayed()
                ).toBeTruthy();
            });

            Logger.info(
                'AFTER TEST: Backpack Added'
            );
        }
        catch (error: any) {

            Logger.error(
                `Add Backpack Failed:
                ${error.message}`
            );

            throw error;
        }
    });

    test(
        'TC_3: Verify Backpack Displayed In Cart',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST: Cart Validation'
        );

        try {

            const loginPage =
                new LoginPage(page);

            const inventoryPage =
                new InventoryPage(page);

            const cartPage =
                new CartPage(page);

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            await test.step(
                'Add backpack to cart',
                async () => {

                await inventoryPage
                    .addItemToCart();
            });

            await test.step(
                'Open cart page',
                async () => {

                await inventoryPage
                    .openCart();
            });

            await test.step(
                'Validate backpack in cart',
                async () => {

                expect(
                    await cartPage
                        .isBackpackDisplayed()
                ).toBeTruthy();
            });

            Logger.info(
                'AFTER TEST: Cart Validation Successful'
            );
        }
        catch (error: any) {

            Logger.error(
                `Cart Validation Failed:
                ${error.message}`
            );

            throw error;
        }
    });

    test(
        'TC_4: Verify Purchase Flow',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST: Purchase Flow'
        );

        try {

            const loginPage =
                new LoginPage(page);

            const inventoryPage =
                new InventoryPage(page);

            const cartPage =
                new CartPage(page);

            const checkoutPage =
                new CheckoutPage(page);

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            await test.step(
                'Add backpack to cart',
                async () => {

                await inventoryPage
                    .addItemToCart();
            });

            await test.step(
                'Open cart page',
                async () => {

                await inventoryPage
                    .openCart();
            });

            await test.step(
                'Proceed to checkout',
                async () => {

                await cartPage
                    .clickCheckout();
            });

            await test.step(
                'Complete checkout flow',
                async () => {

                await checkoutPage
                    .checkout();
            });

            await test.step(
                'Validate order success',
                async () => {

                expect(
                    await checkoutPage
                        .isOrderSuccessful()
                ).toBeTruthy();

                await expect(page)
                    .toHaveURL(
                        /checkout-complete/
                    );
            });

            Logger.info(
                'AFTER TEST: Purchase Successful'
            );
        }
        catch (error: any) {

            Logger.error(
                `Purchase Flow Failed:
                ${error.message}`
            );

            throw error;
        }
    });
});