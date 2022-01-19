import { test} from '@playwright/test';
import { signUpPage } from '../PageObjects/signUpPage'
import { Chance } from 'chance'
let chance = new Chance

test.describe('Blank fields validations tests', () => {
    //May be it`s overhead to check full blank form and every blank field after it, 
    //but sometimes GUI have problems with showing all errors in one time, or with showing specific error, so I made more tets to cover it

    test('click getStarted with blank form', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.getStarted()

        await miroSignUpPage.checkErrorOnScreen('Please enter your name.')
        await miroSignUpPage.checkErrorOnScreen('Enter your email address.')
        await miroSignUpPage.checkErrorOnScreen('Enter your password.')
        await miroSignUpPage.checkErrorOnScreen('Please agree with the Terms to sign up.')
    });

    test('click getStarted with blank Name', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()

        await miroSignUpPage.checkErrorOnScreen('Please enter your name.')
    });

    test('click getStarted with blank email', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()

        await miroSignUpPage.checkErrorOnScreen('Enter your email address.')
    });

    test('click getStarted with blank password', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()

        await miroSignUpPage.checkErrorOnScreen('Enter your password.')
    });

    test('click getStarted without agree terms&conditions', async ({ page }) => {

        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email())
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.getStarted()

        await miroSignUpPage.checkErrorOnScreen('Please agree with the Terms to sign up.')
    });
})