import { expect, Locator, Page } from '@playwright/test';

export class signUpPage {
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly agreementsCheckBox: Locator;
    readonly newsCheckBox: Locator;
    readonly signUpGoogle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.locator('text=Get started now');
        this.nameField = page.locator('text=Name');
        this.emailField = page.locator('text=Work email');
        this.passwordField = page.locator('text=Password 8+ characters');
        this.agreementsCheckBox = page.locator('[data-testid="mr-form-signup-terms-1"] svg');
        this.newsCheckBox = page.locator('[data-testid="mr-form-signup-subscribe-1"] label');
        this.signUpGoogle = page.locator('button:has-text("Sign up with Google")');
    }

    async goto() {
        await this.page.goto('https://miro.com/signup/');
    }

    async fillName(name: string) {
        await this.nameField.fill(name)
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email)
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password)
    }

    async agreeWithTermsAndConditions() {
        await this.agreementsCheckBox.click()
    }
    async subscribeForNews() {
        await this.newsCheckBox.click();
    }

    async getStarted() {
        await this.getStartedButton.click()
    }

    async signUpByGoogle() {
        await this.signUpGoogle.click()
    }

    async checkErrorOnScreen(textError: string) {
        await expect(this.page.locator('text='+ textError)).toBeVisible()
    }
}