import { test} from '@playwright/test';
import { signUpPage } from '../PageObjects/signUpPage'
import { Chance } from 'chance'
let chance = new Chance

test.describe('Password validations tests', () => {
    //passwords hardcoded bcs I dont know how your password evaluation works exactly

    test('click getStarted with short password', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.fillPassword(chance.string({ length: 7 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()
        await miroSignUpPage.checkErrorOnScreen('Please use 8+ characters for secure password.')
    });

    test('fill weak password and get "Weak password" message', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.fillPassword('ssssssss')
        await miroSignUpPage.checkErrorOnScreen('Weak password')
    });

    test('fill weak password and get "So-so password" message', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.fillPassword('ssssssss!123')
        await miroSignUpPage.checkErrorOnScreen('So-so password')
    });

    test('fill weak password and get "Good password" message', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.fillPassword('ssssssss!123$$')
        await miroSignUpPage.checkErrorOnScreen('Good password')
    });

    test('fill weak password and get "Great password" message', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.fillPassword('ssssssss!123$$--')
        await miroSignUpPage.checkErrorOnScreen('Great password')
    });
})