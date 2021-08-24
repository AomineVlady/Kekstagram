"use strict"
const imgBigPicture = document.querySelector('.big-picture__img').querySelector('img'); //содержимое большой картинки
const bigPictureLikesCount = document.querySelector('.likes-count'); //количество likes
const bigPictureCommentsCount = document.querySelector('.comments-count'); //количество comments
const bigPictureDesc = document.querySelector('.social__caption'); //подпись к картинке

const commentsWrapper = document.querySelector('.social__comments'); //контейнер коментарий
const commentsTemplate = document.querySelector('#comment').content.querySelector('li');// шаблон коментария

const bigPictereCancel = document.querySelector('#picture-cancel');//кнопка закрытия большой картинки

const previewPictureWrapper = document.querySelector('.img-upload__overlay')//форма редактирования изображения
const previewPicture = document.querySelector('.img-upload__preview').querySelector('img');//добавленная пользователем картинка

const imgUploaderBtnCLose = document.querySelector('#upload-cancel');// кнопка закрытия формы редактирования



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