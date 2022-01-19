import { test, expect } from '@playwright/test';
import { signUpPage } from '../PageObjects/signUpPage'
import { emailConfirmPage } from '../PageObjects/emailConfirmPage'
import { Chance } from 'chance'

let chance = new Chance
test.describe('succesfull registrations tests', () => {
  test('succesfull registration without news subcribe', async ({ page }) => {

    let miroSignUpPage = new signUpPage(page)
    await miroSignUpPage.goto()
    await miroSignUpPage.fillName(chance.name())
    await miroSignUpPage.fillEmail(chance.email())
    await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
    await miroSignUpPage.agreeWithTermsAndConditions()
    await miroSignUpPage.getStarted()

    let confirmPage = new emailConfirmPage(page)
    await expect(confirmPage.checkEmailTitle).toBeVisible()
  });

  test('succesfull registration with news subcribe', async ({ page }) => {

    let miroSignUpPage = new signUpPage(page)
    await miroSignUpPage.goto()
    await miroSignUpPage.fillName(chance.name())
    await miroSignUpPage.fillEmail(chance.email())
    await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
    await miroSignUpPage.agreeWithTermsAndConditions()
    await miroSignUpPage.subscribeForNews()
    await miroSignUpPage.getStarted()

    let confirmPage = new emailConfirmPage(page)
    await expect(confirmPage.checkEmailTitle).toBeVisible()
  });
})