import { Locator, Page } from '@playwright/test';

export class googleAuthPage {
    readonly page: Page;
    readonly authByGoogleText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.authByGoogleText = page.locator('text=Войдите в аккаунт Google')
    }
}