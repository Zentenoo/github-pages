import { chromium } from "playwright";

const browser = await chromium.launch(
    {headless: true}
)

const page = await browser.newPage()

await page.goto(
    'https://p2p.binance.com/trade/all-payments/USDT?fiat=BOB'
)

const products = await page.$$eval(
    '.headline5 mr-4xs text-primaryText',
    (results) => (
        results.map((el)=>{
           const title = el 
           .querySelector('div')
           ?.innerText
           return {title}
        }
    ))

)
console.log(products)
await browser.close()