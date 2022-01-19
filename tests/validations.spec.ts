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