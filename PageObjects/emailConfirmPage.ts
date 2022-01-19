import { Locator, Page } from '@playwright/test';

export class emailConfirmPage {
    readonly page: Page;
    readonly checkEmailTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkEmailTitle = page.locator('text=Check your email')
    }
}