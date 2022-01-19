import { test, expect } from '@playwright/test';
import { signUpPage } from '../PageObjects/signUpPage'
import { googleRegistrationOverlayPage } from '../PageObjects/googleRegistrationOverlayPage'
import { googleAuthPage } from '../PageObjects/googleAuthPage'

test('succesfull registration by google account', async ({ page }) => {

    let miroSignUpPage = new signUpPage(page)
    await miroSignUpPage.goto()
    await miroSignUpPage.signUpByGoogle()

    let overlayPage = new googleRegistrationOverlayPage(page)
    await overlayPage.agreeWithTermsAndConditions()
    await overlayPage.getStarted()

    let authPage = new googleAuthPage(page)
    await expect(authPage.authByGoogleText).toBeVisible()
  })