import {Locator, Page} from '@playwright/test'

export class LoginPagePOM {
    page: Page;

    //Locator fields - to be initialised to a value in the constructor
    readonly usernameBox: Locator;
    //Would you *ever* want the element a given locator points at to change at runtime? No? Then prevent that possibility by setting it to readonly

    #submitBtn: Locator;
    // Prefixing a field with # makes it a JavaScript private field.
    // Privacy is enforced by JavaScript itself at runtime.
    // #submitBtn cannot be accessed outside this class.
    private passwordBox: Locator;
    // The TypeScript 'private' modifier prevents access outside this
    // class at compile time. It is enforced by the TypeScript type checker,
    // not by the JavaScript runtime.
    // At runtime, the resulting JavaScript property can still be accessed.

    constructor(page :Page){
        this.page = page;
        //Locators go here
        this.usernameBox = page.getByRole('row', { name: 'User Name?' }).locator('#username');
        this.passwordBox = page.locator('#password');
        this.#submitBtn = page.getByRole('link', { name: 'Submit' });
    }
    //Service methods
    async setUsername(username: string){
        //this.usernameBox = this.page.locator('#username').visible(); //Attempt a runtime update of the usernameBox locator - you can't because it's "readonly"
        await this.usernameBox.clear();
        await this.usernameBox.pressSequentially(username, {delay: 200});
    }

    async setPassword(password: string){
        await this.passwordBox.clear();
        await this.passwordBox.fill(password);
    }

    async submitForm(){
        await this.#submitBtn.click();
    }

    async login(username: string, password: string){
        await this.setUsername(username);
        await this.setPassword(password);
        await this.submitForm();
    }

}