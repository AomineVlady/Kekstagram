//random int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//comments
var autorComments = [
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
]

//25 object photos
var photos = [];
for (let i = 0; i < 25; i++) {
    photos[i] = {   
        url: `photos/${i}.jpg`,
        likes: `${getRandomInt(15,200)}`,
        comments: `${getRandomInt(0,6)}`,
        desc: descriptionList = [
            'Тестим новую камеру!',
            'Затусили с друзьями на море',
            'Как же круто тут кормят',
            'Отдыхаем...',
            'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
            'Вот это тачка!',
        ]
    }        
}  

//заполнение фотографиями
const picturesWrapper = document.querySelector('.pictures');    //куда вставляется
const templatePicture = document.querySelector('#picture').content.querySelector('a'); //

for (let i = 1; i < photos.length; i++) {
    var newPhoto = templatePicture.cloneNode(true);
    newPhoto.querySelector('img').src = photos[i].url;   
    newPhoto.querySelector('.picture__comments').textContent = photos[i].comments;   
    newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;   
    picturesWrapper.appendChild(newPhoto);
}

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');

const imgBigPicture = document.querySelector('.big-picture__img').querySelector('img'); //большая картинка
const bigPictureLikesCount = document.querySelector('.likes-count'); //количество likes
const bigPictureCommentsCount = document.querySelector('.comments-count'); //количество comments
const bigPictureDesc = document.querySelector('.social__caption'); //describe

const commentsWrapper = document.querySelector('.social__comments')
const commentsTemplate = document.querySelector('#comment').content.querySelector('li')

//обработка большой картинки
if(pictures.length>0){
    for (let i = 0; i < pictures.length; i++) {
        const picture = pictures[i];
        picture.addEventListener('click', function(e){
            imgBigPicture.src = picture.querySelector('.picture__img').src;
            bigPictureLikesCount.textContent = picture.querySelector('.picture__likes').textContent;
            bigPictureCommentsCount.textContent = picture.querySelector('.picture__comments').textContent;
            bigPictureDesc.textContent = photos[getRandomInt(0,25)].desc[getRandomInt(0,6)];
            getComments(bigPictureCommentsCount.textContent);   //коментарии
            document.querySelector('body').classList.add('open-modal');
            bigPicture.classList.remove('hidden');
            e.preventDefault;
        })        
    }
}

//кнопка закрытия big picture
const bigPictereCancel = document.querySelector('#picture-cancel');
    bigPictereCancel.onclick = function (e) {
        let socialComments = document.querySelectorAll('li.social__comment')
        for (let i = 0; i < socialComments.length; i++) {
            const element = socialComments[i];
            document.querySelector('.social__comments').removeChild(element)
        }
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('open-modal')
        e.preventDefault;
    }

//фукнкция заполнения коментария
function getComments(arg) {
    for (let i = 0; i < arg; i++) {
        const newComment = commentsTemplate.cloneNode(true);
        let rndAutor = getRandomInt(0,autorComments.length);
        newComment.querySelector('img').src = autorComments[rndAutor].avatar;   
        newComment.querySelector('.social__text').textContent = autorComments[rndAutor].message; 
        commentsWrapper.appendChild(newComment);
    }
}