var descPhoto = [25];
function rnd(arg) {
    for (let i = 0; i < mas.length; i++) {
       arg[i] = {   
            url: `photos/${i}.jpg`,
            likes: `${Math.random() * (200 - 15) + 15}`,
            comments: comment(autorComments),
        }        
    }   
}

//генерация случайного коментатора
function comment(arr) {
    for (let i = 0; i < arr.length; i++) {
        return arr[Math.random()* (arr.length-1) +1];
    }
}

//коментаторы
var autorComments = [
    {
        avatar: `img/avatar-1.svg`,
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Артем'
    },
    {
        avatar: `img/avatar-2.svg`,
        message: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        name: 'Николя'
    },
    {
        avatar: `img/avatar-3.svg`,
        message: 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        name: 'Мария'
    },
    {
        avatar: `img/avatar-4.svg`,
        message: 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        name: 'Ян'
    },
    {
        avatar: `img/avatar-5.svg`,
        message: 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
        name: 'Натали'
    },
    {
        avatar: `img/avatar-6.svg`,
        message: 'Всё отлично!',
        name: 'Влад'
    },
]

//описание фотки наверно
var descriptionList = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
]