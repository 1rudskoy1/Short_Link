const input:any = document.querySelector('[data-role = "input"]');
const btn:any = document.querySelector('[data-role="main-btn"]');
let itemsShort:any = document.querySelector('[data-role="items"]');
let btnCopy:any = document.querySelectorAll('[data-role="copy"]');
let shortedLink:Array<object> = [];
input.addEventListener('blur', () =>{
    errorLink("Input correct link", input.value)

});

const shortCut = async (url: string): Promise<string> => {
    const api = 'https://api.shrtco.de/v2/shorten?url=' + url;
    try {
        const response = await fetch(api, {method: 'POST'})
        const data = await response.json();
        if(shortedLink.length !== 0){
            for(let link of shortedLink){
                if(link['long'] == url){
                    errorLink("This link already issue", input.value, true)
                    return
                }
            }
        }
            shortedLink.push({short:data.result.short_link, long: url});
            renderAdd(shortedLink)
        
    } catch (error) {
        if (error) {
            return error.message
        }
    }
}
const renderAdd = (shortArray: Array<object>): void => {
    itemsShort.innerHTML = "";
    shortArray.forEach((item) => {
        itemsShort.insertAdjacentHTML('afterbegin', `
        <div class="short-link">
                    <p class="short-link__text">${item['long']}</p>
                    <div class="result">
                        <p class="result__link">${item['short']}</p>
                        <button class="btn result__btn" data-role="copy">Copy</button>
                    </div>
                </div>
        `)
    })
    btnCopy = document.querySelectorAll('[data-role="copy"]');
    addCopyListener();
}
const errorLink = (errorType: string, link: string, err:boolean = false) => {
    if(link.length < 6 || err === true){
        let error: any = document.querySelector('.action__error');
        error.innerHTML = errorType;
        error.style.display = "block";
        input.classList.add('action__input_error');
        btn.classList.add('action__button_error');
        
    }else{
        let error: any = document.querySelector('.action__error');
        error.style.display = "none";
        input.classList.remove('action__input_error');
        btn.classList.remove('action__button_error');
        
    }
}
btn.addEventListener('click', (): void =>{
    const value:string = input.value;
    shortCut(value);
})

const addCopyListener = () => {
   btnCopy.forEach((copyItem)=>{
    copyItem.addEventListener('click', () => {
        copyItem.innerHTML = "Copied";
        copyItem.classList.add('result__btn-copied');
    })
})   
}