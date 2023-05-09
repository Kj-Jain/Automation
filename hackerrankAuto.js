const puppie = require("puppeteer");
const ans = require("./linked.js");
let page;
let loginlink ='https://www.hackerrank.com/auth/login'
let email ='sutrucakki@gufum.com'
let password ='sutrucakki'
const browserlauch = puppie.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
    
});
browserlauch.then(function(browser){
    let browserpage= browser.newPage();
    return browserpage;
}).then(function(newTab){
    page = newTab;
    let paggoto = newTab.goto(loginlink);
    return paggoto;
}).then(function(){
    let emailEnter = page.type("#input-1",email);
    return emailEnter;
}).then(function(){
    let passEnter = page.type("#input-2",password);
    return passEnter;
}).then(function(){
    let clickbutton = page.click("button[data-analytics='LoginPassword']");
    return clickbutton;
}).then(function(){
   let clickon = waitforsel('div[data-automation="data-structures"]',page);
   return clickon;
})
.then(function(){
    let clickeasy = waitforsel('input[value="easy"]',page);

    return clickeasy
}).then(function(){
    let waitforeasy = page.waitForTimeout(3000)
    return waitforeasy;
}).then(function(){
    let waitforlinked = waitforsel('input[value="linked-lists"]',page);
    return waitforlinked;
}).then(function(){
    let waitforlink = page.waitForTimeout(3000)
    return waitforlink;
})
//return the array of all questions
.then(function(){
    let allchalange = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
    return allchalange;
})

.then(function(ques){
    let first = ques[1];
    let firstclick = first.click()
    return firstclick;
}).then(function(){
    let waiting  = page.waitForSelector('.css-2b097c-container')
    return waiting;
})
.then(function(){
    let clicklang = page.click('.css-2b097c-container');
    return clicklang;
})
  .then(function(){
    let lang = page.type('.css-2b097c-container','java8');
    return lang;
}).then(function(){
    let enterlang = page.keyboard.press("Enter");
    return enterlang;
})
.then(function(){
    let clikccheck = page.click('.custom-holder.inset')
    return clikccheck;
})
.then(function(){
    let write = page.keyboard.type(ans.answer[0]);
    return write;

})
.then(function(){
    let pressCtrl = page.keyboard.down('Control');
    return pressCtrl;
})
.then(function(){
    let pressA = page.keyboard.press('A');
    return pressA;
})
.then(function(){
    let pressX = page.keyboard.press('X');
    return pressX;
})
.then(function(){
    let unpressCtrl = page.keyboard.up('Control');
    return unpressCtrl;
})
.then(function (){
    let waitForSelector = page.waitForSelector(".monaco-editor.no-user-select.vs");
    return waitForSelector;
  })
.then(function(){
    let editor = page.click('.monaco-editor.no-user-select.vs');
    return editor;
})

.then(function(){
    let downkey ;
    for(let i = 0 ; i<5 ; i ++){
      downkey = page.keyboard.press("ArrowDown");
    }
    return downkey;
  })
  .then(function(){
    let pressCtrl = page.keyboard.down('Control');
    return pressCtrl;
})
.then(function(){
    let pressA = page.keyboard.press('V',{delay:50});
    return pressA;
})

.then(function(){
    let unpressCtrl = page.keyboard.up('Control');
    return unpressCtrl;
})
.then(function(){
    let clickrun = page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit,ui-btn-styled');
    return clickrun;
})
  


.catch(function(err){
    return err;
})




function  waitforsel(selector , cpage){
    return new Promise(function(resolve,reject){
        let waitforpromise = cpage.waitForSelector(selector);
        waitforpromise.then(function(){
            let clickpromise = cpage.click(selector);
            return clickpromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

