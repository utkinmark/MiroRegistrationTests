import { Locator, Page } from '@playwright/test';

export class googleRegistrationOverlayPage {
    readonly page: Page;
    readonly agreementsCheckBox: Locator;
    readonly getStartedButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.agreementsCheckBox =  page.locator('text=I agree to Miro’s Terms of Service and Privacy Policy. Please agree with the Ter >> svg')
        this.getStartedButton = page.locator('[data-testid="mr-form-gdpr-btn-signin-1"]')
    }

    async agreeWithTermsAndConditions() {
        await this.agreementsCheckBox.click()
    }

    async getStarted() {
        await this.getStartedButton.click()
    }
}