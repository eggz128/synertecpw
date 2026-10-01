import {Locator, Page} from '@playwright/test'

export class HomePagePOM {
    page: Page;
    loginLink: Locator;

    constructor(page :Page){
        this.page = page;
        //Locators go here
        this.loginLink = page.getByRole('link', {name: 'Login To Restricted Area'});
    }
    //Service methods
    async goLogin(){
        await this.loginLink.click();
    }



}