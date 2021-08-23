"use strict"

const hashTag = document.querySelector('#hashtags');
const btnSubmit = document.querySelector('#upload-submit');
const errorMessage = document.querySelector('.hashtag__text__error');
const textDescription = document.querySelector('.text__description');

function hashTagVerification() {
    let tags = hashTag.value.trim().toLowerCase().split(' ');
    if (tags[0] !== "") {s
        if (hashTagLengthVerification(tags) === true) {
            invalidSet("Один хэштег не должен превышать 20 символов.");
        }
        else if (hashTagCountVerification(tags) === true) {
            invalidSet("Нельзя указывать больше 5 тегов.");
        }
        else if (hashTagHashVerification(tags) === true) {
            invalidSet("Хэштег должен начинаться с символа '#' и продолжаться словом/словосочетаем без пробелов.");
        }
        else if (repeatedHashTagVerificaton(tags) === true) {
            invalidSet("Хэштеги не должны повторяться.");
        }
        else {
            validSet();
        }
    }
    else {
        validReset();
    }
}

function hashTagLengthVerification(tagsMassiv) {
    for (let i = 0; i < tagsMassiv.length; i++) {
        return tagsMassiv[i].length > 20 ? true : false
    }
}

function hashTagCountVerification(tagsMassiv) {
    return tagsMassiv.length > 5 ? true : false;
}

function hashTagHashVerification(tagsMassiv) {
    let re = /\#\w+/;
    for (let i = 0; i < tagsMassiv.length; i++) {
        if (re.test(tagsMassiv[i]) === false) {
            return true;
        }
    }
}

//проверка на потворяющиеся слова
function repeatedHashTagVerificaton(tagsMassiv) {
    if (tagsMassiv.length > 1) {
        let copyMassive = tagsMassiv;
        for (let i = 0; i < tagsMassiv.length; i++) {
            for (let j = 1; j < copyMassive.length; j++) {
                if (copyMassive[i + j] === tagsMassiv[i]) {
                    return true;
                }
            }
        }
    }
}

//обновление формы
function validReset() {
    hashTag.classList.remove('invalid');
    hashTag.classList.remove('valid');
    hashTag.value = "";
    textDescription.value = "";
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden');
    btnSubmit.removeAttribute("disabled", "disabled");

}

function validSet() {
    hashTag.classList.remove('invalid');
    hashTag.classList.add('valid');
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden');
    btnSubmit.removeAttribute("disabled", "disabled");

}

function invalidSet(err) {
    hashTag.classList.remove('valid');
    hashTag.classList.add('invalid');
    errorMessage.textContent = err;
    errorMessage.classList.remove('hidden');
    btnSubmit.setAttribute("disabled", "disabled");
}
