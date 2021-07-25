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

//клонирования шаблона картинки
function picturesSet() {
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
function onPictureClick(e) {
    e.preventDefault;
    imgBigPicture.src = e.currentTarget.querySelector('.picture__img').src;
    bigPictureLikesCount.textContent = e.currentTarget.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = e.currentTarget.querySelector('.picture__comments').textContent;
    bigPictureDesc.textContent = photos[getRandomInt(0,25)].desc[getRandomInt(0,6)];
    getComments(bigPictureCommentsCount.textContent);   //коментарии
    document.querySelector('body').classList.add('open-modal');
    bigPicture.classList.remove('hidden');
}

//обработка большой картинки
function openBigPicture() {
    const pictures = document.querySelectorAll('.picture');
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
        let element = socialComments[i];
        commentsWrapper.removeChild(element)
    }
}

//алгоритм закрытия big picture
function closeBigPicture(e) {
    e.preventDefault;
        bigPictureCommentsUpdate();
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('open-modal')
}

//клик close big picture
function onCloseBigPictureBtnClick() {
    bigPictereCancel.addEventListener('click', closeBigPicture);
}

//спрятать блоки счётчика и загрузки доп. коментариев
const counterComments = document.querySelector('.social__comment-count');
const loaderComments = document.querySelector('.comments-loader');
counterComments.classList.add('visually-hidden');
loaderComments.classList.add('visually-hidden');
//
//
//
//Main INIT funcs
getPhoto(photos); //генерация объектов "картинка"
picturesSet(); //заполнение картинками страницы 
openBigPicture(); //открытие большой картинки
onCloseBigPictureBtnClick();// закрытие большой картинки