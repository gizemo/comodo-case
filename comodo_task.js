import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `https://www.saucedemo.com/`;
    let amount=0;
    function getPriceWithoutCurrencyCode(price){

        var parsedPrice = price.split('$')
        var actualPrice = parseFloat(parsedPrice[1])
        return actualPrice;
    }
    
    function setTotalAmount(price){

        amount += price;
    }
    
    function getTotalAmount(){
        return amount;
    }

test(`New Test`, async t => {
    await t
        .typeText('#user-name', 'standard_user')    
        .typeText('#password', 'secret_sauce')
        .click('#login-button')
        .click('#add-to-cart-sauce-labs-backpack')
        .click('#add-to-cart-sauce-labs-bike-light')
        .click(Selector('#shopping_cart_container span').withText('2'))
        .click('#checkout')
        .typeText('#first-name', 'gizem')
        .typeText('#last-name', 'oguzoglu')
        .typeText('#postal-code', '06')
        .click('#continue')
        .expect(Selector('#checkout_summary_container div').withText('29.99').nth(5).innerText).eql('$29.99')

        const price1WithCurrencyCode = await Selector('#checkout_summary_container div').withText('$29.99').nth(5).innerText
        const price1WithoutCurrencyCode = getPriceWithoutCurrencyCode(price1WithCurrencyCode)
        setTotalAmount(price1WithoutCurrencyCode)
        const price2WithCurrencyCode = await Selector('#checkout_summary_container div').withText('$9.99').nth(5).innerText
        const price2WithoutCurrencyCode = getPriceWithoutCurrencyCode(price2WithCurrencyCode)
        setTotalAmount(price2WithoutCurrencyCode)
        const price3WithCurrencyCode = await Selector('#checkout_summary_container div').withText('$39.98').nth(2).innerText
        const price3WithoutCurrencyCode = getPriceWithoutCurrencyCode(price3WithCurrencyCode)
        await t.expect(price3WithoutCurrencyCode).eql(getTotalAmount())
});