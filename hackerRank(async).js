const puppie = require("puppeteer");
const ans = require("./linked.js");
let page;
let loginlink ='https://www.hackerrank.com/auth/login'
let email ='sutrucakki@gufum.com'
let password ='sutrucakki';
(async function(){


try{
    const browserlauch = await puppie.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
        
    })
    let newTab = await browserlauch.newPage();
    await newTab.goto(loginlink);
    await newTab.type("#input-1",email);
    await newTab.type("#input-2",password);
    await newTab .click("button[data-analytics='LoginPassword']");

    await wait('div[data-automation="data-structures"]',newTab);
  
    await wait('input[value="easy"]',newTab);
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    await wait('input[value="linked-lists"]',newTab,{visble:true});
    await new Promise(resolve => setTimeout(resolve, 3000))
  
    let ques = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:100});
    let firstq = ques[1];
    await firstq.click();

    await wait('.css-2b097c-container',newTab);

    await newTab.type('.css-2b097c-container','java8');
    await newTab.keyboard.press("Enter");

    await newTab.click('.custom-holder.inset');
    await newTab.keyboard.type(ans.answer[0]);
    await newTab.keyboard.down('Control');
    await newTab.keyboard.press('A');
    await newTab.keyboard.press('X');
    await newTab.keyboard.up('Control');
    await wait('.monaco-editor.no-user-select.vs',newTab)
    
    for(let i = 0 ; i<5 ; i ++){
       await newTab.keyboard.press("ArrowDown");
      }
    await newTab.keyboard.down('Control');
    await newTab.keyboard.press('V',{delay:50});
    await newTab.keyboard.up('Control');
    await newTab.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit,ui-btn-styled');

    
}catch(error){
console.log(error);
}})()

async function wait(selector,page){
await page.waitForSelector(selector);
let clicked = page.click(selector);
return clicked;
} 






