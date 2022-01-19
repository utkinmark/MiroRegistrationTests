import { test} from '@playwright/test';
import { signUpPage } from '../PageObjects/signUpPage'
import { Chance } from 'chance'
let chance = new Chance

test.describe('Email validations tests', () => {
    test('click getStarted with no @ symbol', async ({ page }) => {
        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail('im not email')
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()
        await miroSignUpPage.checkErrorOnScreen('Enter a valid email address.')
    });

    test('click getStarted with no symbols before @', async ({ page }) => {
        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail('@test.ru')
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()
        await miroSignUpPage.checkErrorOnScreen('Enter a valid email address.')
    });

    test('click getStarted with no symbols after @', async ({ page }) => {
        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail('im_mail@')
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()
        await miroSignUpPage.checkErrorOnScreen('Enter a valid email address.')
    });

    test('click getStarted with something before email', async ({ page }) => {
        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail('something ' + chance.email())
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()
        await miroSignUpPage.checkErrorOnScreen('Enter a valid email address.')
    });

    test('click getStarted with something after email', async ({ page }) => {
        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail(chance.email() + ' something')
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()
        await miroSignUpPage.checkErrorOnScreen('Enter a valid email address.')
    });

    test('click getStarted with already existing email', async ({ page }) => {
        // can`t do this story bcs of tech ussue with reg http://joxi.ru/MAj5ky4CdYyE52
        let miroSignUpPage = new signUpPage(page)
        await miroSignUpPage.goto()
        await miroSignUpPage.fillName(chance.name())
        await miroSignUpPage.fillEmail('test@test.test')
        await miroSignUpPage.fillPassword(chance.string({ length: 8 }))
        await miroSignUpPage.agreeWithTermsAndConditions()
        await miroSignUpPage.getStarted()
        await miroSignUpPage.checkErrorOnScreen('This password already existing') //Here is wrong matcher, bcs I got error and dont know how it perform normaly
    });
})