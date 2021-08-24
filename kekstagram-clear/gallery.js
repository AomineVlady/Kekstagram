"use strict"

//список подписей комментов
const descriptionList = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
];
const PHOTOS_COUNT = 25;    //кол-во фотографий
const photos = [];
const picturesWrapper = document.querySelector('.pictures');    //куда вставляется
const templatePicture = document.querySelector('#picture').content.querySelector('a'); //содержимое миниатюры картинки
const bigPicture = document.querySelector('.big-picture');// большая картинка

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
            likes: `${getRandomInt(15, 200)}`,
            comments: `${getRandomInt(0, 6)}`,
            desc: descriptionList,
        }
    }
}

//заполнение страницы картинками путём клонирования шаблона
function picturesSet() {
    getPhoto(photos); //генерация объектов "картинка"
    for (let i = 1; i < photos.length; i++) {
        let newPhoto = templatePicture.cloneNode(true);
        newPhoto.addEventListener('click', onPictureClick);
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
        let rndAutor = getRandomInt(0, autorComments.length);
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
    bigPictureDesc.textContent = photos[getRandomInt(0, PHOTOS_COUNT)].desc[getRandomInt(0, 6)];
    getComments(bigPictureCommentsCount.textContent);   //коментарии
    document.querySelector('body').classList.add('open-modal');
    openBox(bigPicture);
    initBigPictureEventListner();
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
    if (evt.key === 'Escape') {
        evt.preventDefault();
        closeBigPicture();
        removeBigPictureEventListner();
    }
}



function initBigPictureEventListner() {
    bigPictereCancel.addEventListener('click', clickOnCloseBigPicture);
    document.addEventListener('keydown', clickOnCloseBigPicture);
}

function removeBigPictureEventListner() {
    bigPictereCancel.removeEventListener('click', clickOnCloseBigPicture);
    document.removeEventListener('keydown', clickOnCloseBigPicture);
}

//кнопки сортировки фотографий
//скорее всего код нечитабельный
const countLike = ".picture__likes"
const countComments = ".picture__comments"
const btnSortPopular = document.querySelector('#filter-popular')
const btnSortDiscus = document.querySelector('#filter-discussed')
const sortBtns = document.querySelectorAll('.img-filters__button')//нажатая кнопка

function btnSortClick() {
    sortBtns.forEach(btn => btn.addEventListener('click', (e) => {
        sortBtns.forEach(i => i.classList.remove('img-filters__button--active'))
        e.target.classList.add('img-filters__button--active')
    }))
    btnSortPopular.addEventListener('click', sortPictureByLikes)
    btnSortDiscus.addEventListener('click', sortPictureByComments)
}

function sortPictureByLikes() {
    let thumb = document.querySelectorAll(".picture");
    thumb = [].slice.call(thumb, 0);
    let parent = thumb.map((el) => {
        return el.parentNode
    });
    thumb.sort((a, b) => {
        return b.querySelector(".picture__likes").textContent - a.querySelector(".picture__likes").textContent
    }).forEach((el, i) => {
        parent[i].appendChild(el)
    })
}

function sortPictureByComments() {
    let thumb = document.querySelectorAll(".picture");
    thumb = [].slice.call(thumb, 0);
    let parent = thumb.map((el) => {
        return el.parentNode
    });
    thumb.sort((a, b) => {
        return b.querySelector(".picture__comments").textContent - a.querySelector(".picture__comments").textContent
    }).forEach((el, i) => {
        parent[i].appendChild(el)
    })
}


window.onload = () => {
    picturesSet() //заполнение картинками страницы 
    btnSortClick() // переключатели сортировки фотографий
}