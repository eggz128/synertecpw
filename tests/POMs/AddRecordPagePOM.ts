import { Page, Locator } from "@playwright/test";

export class AddRecordPOM {
    heading: Locator
    page: Page

    constructor(page: Page){
        this.heading = page.locator('h1');
        this.page = page;
    }

    async getHeading(): Promise<string> {
        //await this.page.waitForTimeout(1000); //Hack wait to ensure enough time has passed for new page to load
        return await this.heading.innerText() ?? "" ;;
    }

}