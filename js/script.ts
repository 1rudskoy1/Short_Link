const input:any = document.querySelector('[data-role = "input"]');
const btn:any = document.querySelector('[data-role="main-btn"]');
input.addEventListener('blur', () =>{
    let value = input.value.split('://');
    let https = value[0] == "http" || value[0] == "https" ? true : false;
    if(value[1] < 3 || !https){
        let error: any = document.querySelector('.action__error');
        error.style.display = "block";
        input.classList.add('action__input_error');
        btn.classList.add('action__button_error');
        
    }else{
        let error: any = document.querySelector('.action__error');
        error.style.display = "none";
        input.classList.remove('action__input_error');
        btn.classList.remove('action__button_error');
        
    }

});