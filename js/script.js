var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var input = document.querySelector('[data-role = "input"]');
var btn = document.querySelector('[data-role="main-btn"]');
var itemsShort = document.querySelector('[data-role="items"]');
var btnCopy = document.querySelectorAll('[data-role="copy"]');
var shortedLink = [];
input.addEventListener('blur', function () {
    errorLink("Input correct link", input.value);
});
var shortCut = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var api, response, data, _i, shortedLink_1, link, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                api = 'https://api.shrtco.de/v2/shorten?url=' + url;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(api, { method: 'POST' })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (shortedLink.length !== 0) {
                    for (_i = 0, shortedLink_1 = shortedLink; _i < shortedLink_1.length; _i++) {
                        link = shortedLink_1[_i];
                        if (link['long'] == url) {
                            errorLink("This link already issue", input.value, true);
                            return [2 /*return*/];
                        }
                    }
                }
                shortedLink.push({ short: data.result.short_link, long: url });
                renderAdd(shortedLink);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                if (error_1) {
                    return [2 /*return*/, error_1.message];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var renderAdd = function (shortArray) {
    itemsShort.innerHTML = "";
    shortArray.forEach(function (item) {
        itemsShort.insertAdjacentHTML('afterbegin', "\n        <div class=\"short-link\">\n                    <p class=\"short-link__text\">".concat(item['long'], "</p>\n                    <div class=\"result\">\n                        <p class=\"result__link\">").concat(item['short'], "</p>\n                        <button class=\"btn result__btn\" data-role=\"copy\">Copy</button>\n                    </div>\n                </div>\n        "));
    });
    btnCopy = document.querySelectorAll('[data-role="copy"]');
    addCopyListener();
};
var errorLink = function (errorType, link, err) {
    if (err === void 0) { err = false; }
    if (link.length < 6 || err === true) {
        var error = document.querySelector('.action__error');
        error.innerHTML = errorType;
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
};
btn.addEventListener('click', function () {
    var value = input.value;
    shortCut(value);
});
var addCopyListener = function () {
    btnCopy.forEach(function (copyItem) {
        copyItem.addEventListener('click', function () {
            copyItem.innerHTML = "Copied";
            copyItem.classList.add('result__btn-copied');
        });
    });
};
