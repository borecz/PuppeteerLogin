
let ss: string = 'Milan'

context('Login with puppeteer and return cookies to Cypress', () => {
    const username = 'john@sharklasers.com'
    const password = 'Qwerty123'

    const loginOptions = {
        username,
        password,
        loginUrl: 'https://www.aboutyou.de/oauth/login',
        headless: true,
        logs: true,
        postLoginSelector: 'a[data-test-id="WishlistIconHeader"]',
        getAllBrowserCookies: true
    }
    interface Cookie {
        name: string,
        value: string,
        domain: string,
        expires: number,
        httpOnly: boolean,
        path: string,
        secure: false,
        session: true,
        size: number
    }

    afterEach(() => { cy.clearCookies() })

    it('Login using puppeteer', () => {
        cy.visit('https://www.aboutyou.de/dein-shop')
        cy.get('._userIcon_e381b').click()
        cy.task('Login', loginOptions).then(() => {
            cy.visit('https://www.aboutyou.de/dein-shop')
            cy.get('li[data-test-id="Basket"] a[data-test-id="WishlistIconHeader"]').should('be.visible').click()
        });
    })
})
