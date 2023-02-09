var input = document.querySelector('[data-role = "input"]');
var btn = document.querySelector('[data-role="main-btn"]');
input.addEventListener('blur', function () {
    var value = input.value.split('://');
    var https = value[0] == "http" || value[0] == "https" ? true : false;
    if (value[1] < 3 || !https) {
        var error = document.querySelector('.action__error');
        error.style.display = "block";
        input.classList.add('action__input_error');
        btn.classList.add('action__button_error');
    }
    else {
        var error = document.querySelector('.action__error');
        error.style.display = "none";
        input.classList.remove('action__input_error');
        btn.classList.remove('action__button_error');
    }
});
var shortCut = function (url) {
    var resultPromise = new Promise(function (resolve, reject) {
        resolve(fetch(' https://api.shrtco.de/v2/shorten?url=' + url));
    }).then(function (result) {
        console.log(result);
    });
};
shortCut('https://google.com');
