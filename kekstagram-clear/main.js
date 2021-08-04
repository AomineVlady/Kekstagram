"use strict"
//заполнение фотографиями
const picturesWrapper = document.querySelector('.pictures');    //куда вставляется
const templatePicture = document.querySelector('#picture').content.querySelector('a'); //содержимое миниатюры картинки
const bigPicture = document.querySelector('.big-picture');// большая картинка

const imgBigPicture = document.querySelector('.big-picture__img').querySelector('img'); //содержимое большой картинки
const bigPictureLikesCount = document.querySelector('.likes-count'); //количество likes
const bigPictureCommentsCount = document.querySelector('.comments-count'); //количество comments
const bigPictureDesc = document.querySelector('.social__caption'); //подпись к картинке

const commentsWrapper = document.querySelector('.social__comments'); //контейнер коментарий
const commentsTemplate = document.querySelector('#comment').content.querySelector('li');// шаблон коментария

const bigPictereCancel = document.querySelector('#picture-cancel');//кнопка закрытия большой картинки

const previewPictureWrapper = document.querySelector('.img-upload__overlay')//форма редактирования изображения
const previewPicture = document.querySelector('.img-upload__preview').querySelector('img');//добавленная пользователем картинка
const uploadFile = document.querySelector('#upload-file');//input загрузчик файла
const imgUploaderBtnCLose = document.querySelector('#upload-cancel');// кнопка закрытия формы редактирования

const PHOTOS_COUNT = 25;    //кол-во фотографий

//авторы коментариев и коментарии
const autorComments = [
    {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Артем'
    },
    {
        avatar: 'img/avatar-2.svg',
        message: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        name: 'Николя'
    },
    {
        avatar: 'img/avatar-3.svg',
        message: 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        name: 'Мария'
    },
    {
        avatar: 'img/avatar-4.svg',
        message: 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        name: 'Ян'
    },
    {
        avatar: 'img/avatar-5.svg',
        message: 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
        name: 'Натали'
    },
    {
        avatar: 'img/avatar-6.svg',
        message: 'Всё отлично!',
        name: 'Влад'
    },
];

//список подписей комментов
const descriptionList = [
                'Тестим новую камеру!',
                'Затусили с друзьями на море',
                'Как же круто тут кормят',
                'Отдыхаем...',
                'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
                'Вот это тачка!',
    ];

const photos = [];

//random int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//генерация объектов "картинка"
function getPhoto(arg) {
    for (let i = 0; i < PHOTOS_COUNT; i++) {
        arg[i] = {   
            url: `photos/${i}.jpg`,
            likes: `${getRandomInt(15,200)}`,
            comments: `${getRandomInt(0,6)}`,
            desc: descriptionList,
        }
    }        
}

//функция открытия (удаляет класс hidden у элемента)
function openBox(arg) {
    arg.classList.remove('hidden');
}

//функция открытия (добавляет класс hidden элементу)
function closeBox(arg) {
    arg.classList.add('hidden');
}

//заполнение страницы картинками путём клонирования шаблона
function picturesSet() {
    getPhoto(photos); //генерация объектов "картинка"
    for (let i = 1; i < photos.length; i++) {
        let newPhoto = templatePicture.cloneNode(true);
        newPhoto.querySelector('img').src = photos[i].url;   
        newPhoto.querySelector('.picture__comments').textContent = photos[i].comments;   
        newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;   
        picturesWrapper.appendChild(newPhoto);
    }
}

//фукнкция заполнения коментария
function getComments(arg) {
    for (let i = 0; i < arg; i++) {
        let newComment = commentsTemplate.cloneNode(true);
        let rndAutor = getRandomInt(0,autorComments.length);
        newComment.querySelector('img').src = autorComments[rndAutor].avatar;   
        newComment.querySelector('.social__text').textContent = autorComments[rndAutor].message; 
        commentsWrapper.appendChild(newComment);
    }
}

//клик по миниатюре картинки
function onPictureClick(evt) {
    evt.preventDefault();
    imgBigPicture.src = evt.currentTarget.querySelector('.picture__img').src;
    bigPictureLikesCount.textContent = evt.currentTarget.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = evt.currentTarget.querySelector('.picture__comments').textContent;
    bigPictureDesc.textContent = photos[getRandomInt(0,PHOTOS_COUNT)].desc[getRandomInt(0,6)];
    getComments(bigPictureCommentsCount.textContent);   //коментарии
    document.querySelector('body').classList.add('open-modal');
    openBox(bigPicture);
    initBigPictureEventListner();
}

//обработка большой картинки
function openBigPicture() {
    let pictures = document.querySelectorAll('.picture');
    if(pictures.length>0){
        for (let i = 0; i < pictures.length; i++) {
            let picture = pictures[i];
            picture.addEventListener('click', onPictureClick); 
        }
    }
}

//обновление коментариев
function bigPictureCommentsUpdate() {
    let socialComments = document.querySelectorAll('li.social__comment')
    for (let i = 0; i < socialComments.length; i++) {
        commentsWrapper.removeChild(socialComments[i])
    }
}

//алгоритм закрытия big picture
function closeBigPicture() {
    closeBox(bigPicture);
    bigPictureCommentsUpdate();
    document.querySelector('body').classList.remove('open-modal');
}

function clickOnCloseBigPicture(evt) {
    evt.preventDefault();
    closeBigPicture();
    removeBigPictureEventListner();
}

function pressEscBigPicture(evt) {
    if(evt.key === 'Escape'){
        evt.preventDefault();
        closeBigPicture();
        removeBigPictureEventListner();
    }
}
//



function initBigPictureEventListner() {
    bigPictereCancel.addEventListener('click', clickOnCloseBigPicture);
    document.addEventListener('keydown', clickOnCloseBigPicture);
}

function removeBigPictureEventListner() {
    bigPictereCancel.removeEventListener('click', clickOnCloseBigPicture);
    document.removeEventListener('keydown', clickOnCloseBigPicture);
}


//спрятать блоки счётчика и загрузки доп. коментариев (в ТЗ 1. было)
const counterComments = document.querySelector('.social__comment-count');
const loaderComments = document.querySelector('.comments-loader');
counterComments.classList.add('visually-hidden');
loaderComments.classList.add('visually-hidden');
//


//Main INIT funcs
picturesSet(); //заполнение картинками страницы 
openBigPicture(); //открытие большой картинки (присвоил всем миниатюрам алгоритм открытия)


//UPLOADER

//инициализация ф-й uploader
function initUploaderEventListner() {
    document.addEventListener('keydown', onUploaderEscPress);
    imgUploaderBtnCLose.addEventListener('click', clickCloseUploader);
    hashTag.addEventListener('focus', pressEcsRemove); 
    hashTag.addEventListener('blur', hashTagVerification);
    hashTag.addEventListener('blur',  pressEcsAdd);
}
//извлечение ф-й uploader
function removeUploaderEventListner() {
    document.removeEventListener('keydown', onUploaderEscPress);
    imgUploaderBtnCLose.removeEventListener('click', clickCloseUploader);
    hashTag.removeEventListener('focus', pressEcsRemove); 
    hashTag.removeEventListener('blur', hashTagVerification);
    hashTag.removeEventListener('blur',  pressEcsAdd);
}

//закрытие uploader кликом
function clickCloseUploader(evt) {
    evt.preventDefault();
    closeBox(previewPictureWrapper);
    uploaderReset();
    updatePictureEffect();
    removeUploaderEventListner();
}

//закрытие uploader клавишей escape
function onUploaderEscPress(evt) {
    if(evt.key === 'Escape'){
        evt.preventDefault();
        closeBox(previewPictureWrapper);
        uploaderReset();
        updatePictureEffect();
        removeUploaderEventListner();
    }
}
//сброс uploader-изображения
function uploaderReset() {
    uploadFile.value = ""; 
}

function pressEcsRemove() {
    document.removeEventListener('keydown', onUploaderEscPress);
}
function pressEcsAdd() {
    document.removeEventListener('keydown', onUploaderEscPress);
}

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

//эффекты - сложновато (скорее всего переделать)
const pin = document.querySelector('.effect-level__pin');
const pinDepth = document.querySelector('.effect-level__depth');
const pinLine = document.querySelector('.effect-level__line');


const effects = document.querySelectorAll('.effects__preview');
function effectsCollector(mas) {
    for (let i = 0; i < mas.length; i++) {
        mas[i].addEventListener('click', effectsPictureFocus);       
    }
}

//для обнуления эффектов.
function updatePictureEffect(){
    previewPicture.className = previewPicture.classList[0];
}

//фокус на миниатюре эффекта
function effectsPictureFocus(evt) {
    updatePictureEffect();
    previewPicture.classList.add(evt.currentTarget.classList[1]);
}

effectsCollector(effects);


/*
Работа с валидацией формы
*/

const hashTag = document.querySelector('#hashtags');
const btnSubmit = document.querySelector('#upload-submit');
const errorMessage = document.querySelector('.hashtag__text__error');

function hashTagVerification() { 
    let tags = hashTag.value.trim().split(' ');
    if (hashTagLengthVerification(tags) === true) {
        invalidSet("Один хэштег не должен превышать 20 символов.");
    }
    else if (hashTagCountVerification(tags) === true) {
        invalidSet("Нельзя указывать больше 5 тегов.");
    }
    else if (hashTagHashVerification(tags) === true) {
        invalidSet("Хэштег должен начинаться с символа '#'.");
    }
    else{
        validSet();
    }
}

function hashTagLengthVerification(tagsMassiv) {
    for (let i = 0; i < tagsMassiv.length; i++) {
        if(tagsMassiv[i].length>20){
            return true;
        } 
    }
}

function hashTagCountVerification(tagsMassiv) {
    return tagsMassiv.length>5 ? true:false;
}

function hashTagHashVerification(tagsMassiv) {
    if (tagsMassiv !== 0 || tagsMassiv !== undefined) {
        let re = new RegExp('#\w');
        for (let i = 0; i < tagsMassiv.length; i++) {
            for (let j = 0; j < tagsMassiv.length; j++) {
                if (tagsMassiv[i,j][0] === "#") {
                    return false;
                }
            }
        }
    }
}



function validSet() {
    hashTag.classList.remove('invalid');
    hashTag.classList.add('valid');
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden')
    
}

function invalidSet(err) {
    hashTag.classList.remove('valid');
    hashTag.classList.add('invalid');
    errorMessage.textContent = err;
    errorMessage.classList.remove('hidden')
}