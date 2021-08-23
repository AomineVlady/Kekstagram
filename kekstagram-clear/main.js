"use strict"

//общая функция открытия (удаляет класс hidden у элемента)
function openBox(arg) {
    arg.classList.remove('hidden');
}

//общая функция открытия (добавляет класс hidden элементу)
function closeBox(arg) {
    arg.classList.add('hidden');
}

//спрятать блоки счётчика и загрузки доп. коментариев (в ТЗ 1. было)
const counterComments = document.querySelector('.social__comment-count');
const loaderComments = document.querySelector('.comments-loader');
counterComments.classList.add('visually-hidden');
loaderComments.classList.add('visually-hidden');
//

//UPLOADER

//инициализация ф-й uploader
function initUploaderEventListner() {
    document.addEventListener('keydown', onUploaderEscPress);
    imgUploaderBtnCLose.addEventListener('click', clickCloseUploader);
    hashTag.addEventListener('focus', pressEcsRemove); //при фокусе на строку ввода `esc` не закрывает форму
    hashTag.addEventListener('blur', hashTagVerification);
    hashTag.addEventListener('blur', pressEcsAdd);
    effectsCollector(effects);
}
//извлечение ф-й uploader
function removeUploaderEventListner() {
    document.removeEventListener('keydown', onUploaderEscPress);
    imgUploaderBtnCLose.removeEventListener('click', clickCloseUploader);
    hashTag.removeEventListener('focus', pressEcsRemove);
    hashTag.removeEventListener('blur', hashTagVerification);
    hashTag.removeEventListener('blur', pressEcsAdd);
}

//закрытие uploader кликом
function clickCloseUploader(evt) {
    evt.preventDefault();
    uploaderReset();
}

//закрытие uploader клавишей escape
function onUploaderEscPress(evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        uploaderReset();
    }
}
//сброс uploader
function uploaderReset() {
    uploadFile.value = "";
    closeBox(previewPictureWrapper);
    updatePictureEffect();
    removeUploaderEventListner();
    validReset();
}

function pressEcsRemove() {
    document.removeEventListener('keydown', onUploaderEscPress);
}
function pressEcsAdd() {
    document.addEventListener('keydown', onUploaderEscPress);
}

const uploadFile = document.querySelector('#upload-file');//input загрузчик файла
//загрузка и добавления изображения
function changeHandler() {
    let file = uploadFile.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        previewPicture.src = reader.result;
    }
    reader.readAsDataURL(file);
    openBox(previewPictureWrapper);
    initUploaderEventListner();
}
uploadFile.addEventListener('change', changeHandler);

//эффекты - сложноватo

const effects = document.querySelectorAll('.effects__preview');
function effectsCollector(mas) {
    for (let i = 0; i < mas.length; i++) {
        mas[i].addEventListener('click', effectsPictureFocus);
    }
}

//для обнуления эффектов.
function updatePictureEffect() {
    previewPicture.className = previewPicture.classList[0];
}

//фокус на миниатюре эффекта
function effectsPictureFocus(evt) {
    updatePictureEffect();
    previewPicture.classList.add(evt.currentTarget.classList[1]);
}


//перемещение маркера (изменения глубины накладываемого эффекта)
const pinDepth = document.querySelector('.effect-level__depth');
const pinLine = document.querySelector('.effect-level__line');
const pin = pinLine.querySelector('.effect-level__pin');
const pinValue = pinLine.querySelector('.effect-level__value');


pin.addEventListener('mousedown', (evt) => {
    evt.preventDefault()

    let shiftX = evt.clientX - thumb.getBoundingClientRect().left

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    function onMouseMove(evt) {
        evt.preventDefault()
        let newLeft = evt.clientX - shiftX - pinLine.getBoundingClientRect().left
        if (newLeft < 0) {
            newLeft = 0
        }
        let rightEdge = pinLine.offsetWidth - pin.offsetWidth
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        pin.style.left = newLeft + '%'
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }
    

    function moveAt(pageX){
        
        if(val > 100){
            pin.style.left = 20 + '%'
        }
        if (val <= 0) {
            pin.style.left = 0 + '%'
        }
        else{
            pin.style.left = val + '%'
            pin.addEventListener('mouseup', pinEvents) 
        }
    }
})

// let val = (((pageX - shift.x) / pinLine.clientWidth)*100)