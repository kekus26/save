let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('easy')) {
        speed = 1000;
    }
    else if (e.target.classList.contains('normal')) {
        speed = 500;
    }
    else if (e.target.classList.contains('hard')) {
        speed = 200;
    }

    if (e.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startTetris();
    }
})

// хранит 7 классических фигур тетриса
let classicFigure = [
    // палка
    [
        [0, 0],     //      0
        [0, 1],     //      0
        [0, 2],     //      0
        [0, 3],     //      0
        // поворот фигуры на 90 градусов
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // поворот на 180 градусов
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
        // поворот фигуры на 270 градусов
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // поворот на 360 градусов
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
    ],
    // квадрат
    [
        [0, 0],
        [1, 0],     //      0 0
        [0, 1],     //      0 0
        [1, 1],
        // поворот фигуры на 90 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот фигуры на 270 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот на 360 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    ],
    // L
    [
        [0, 0],
        [1, 0],     //      0
        [0, 1],     //      0
        [0, 2],     //      0 0
        // поворот фигуры на 90 градусов
        [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1],
        ],
        // поворот на 180 градусов
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0],
        ],
        // поворот фигуры на 270 градусов
        [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1],
        ],
        // поворот на 360 градусов
        [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0],
        ],
    ],
    // _|
    [
        [0, 0],
        [1, 0],     //        0
        [1, 1],     //        0
        [1, 2],     //      0 0
        // поворот фигуры на 90 градусов
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1],
        ],
        // поворот на 180 градусов
        [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0],
        ],
        // поворот фигуры на 270 градусов
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1],
        ],
        // поворот на 360 градусов
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1],
        ],
    ],
    // _/-
    [
        [0, 0],
        [1, 0],     //        0 0
        [1, 1],     //      0 0
        [2, 1],
        // поворот фигуры на 90 градусов
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0],
        ],
        // поворот на 180 градусов
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1],
        ],
        // поворот фигуры на 270 градусов
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0],
        ],
        // поворот на 360 градусов
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1],
        ],
    ],
    // _|-|_
    [
        [0, 0],
        [1, 0],     //        0
        [2, 0],     //      0 0 0
        [1, 1],
        // поворот фигуры на 90 градусов
        [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1],
        ],
        // поворот фигуры на 270 градусов
        [
            [1, -1],
            [1, -1],
            [1, -1],
            [0, 0],
        ],
        // поворот на 360 градусов
        [
            [-2, 0],
            [0, -1],
            [0, -1],
            [-1, -1],
        ],
    ],
    // -\_
    [
        [0, 0],
        [1, 0],     //    0 0
        [-1, 1],     //      0 0
        [0, 1],
        // поворот фигуры на 90 градусов
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
        // поворот фигуры на 270 градусов
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        // поворот на 360 градусов
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
    ],
]

// хранит 8 кастомных фигур
let customFigure = [
    // #1
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [2, 1],
        // поворот фигуры на 90 градусов
        [
            [0, 0],
            [0, 0],
            [-2, 1],
            [0, 1],
            [-1, 1],
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [1, 0],
            [0, 0],
            [1, -1],
            [1, -1],
        ],
        // поворот фигуры на 270 градусов
        [
            [0, 0],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [-1, 1],
        ],
        // поворот на 360 градусов
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [0, -1],
            [1, -1],
        ],
    ],
    // #2
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
        [1, 2],
        // поворот фигуры на 90 градусов
        [
            [0, 0],
            [-1, 1],
            [-2, 2],
            [0, 0],
            [1, -1],
        ],
        // поворот на 180 градусов
        [
            [0, 2],
            [1, 1],
            [2, 0],
            [0, 0],
            [-1, -1],
        ],
        // поворот фигуры на 270 градусов
        [
            [2, 0],
            [1, -1],
            [0, -2],
            [0, 0],
            [-1, 1],
        ],
        // поворот на 360 градусов
        [
            [-2, -2],
            [-1, -1],
            [0, 0],
            [0, 0],
            [1, 1],
        ],
    ],
    // #3
    [
        [0, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [0, 2],
        // поворот фигуры на 90 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот фигуры на 270 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот на 360 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    ],
    // #4
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
        [2, 1],
        // поворот фигуры на 90 градусов
        [
            [1, 2],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот на 180 градусов
        [
            [2, -1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот фигуры на 270 градусов
        [
            [-1, -2],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // поворот на 360 градусов
        [
            [-2, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    ],
    // #5
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        // поворот фигуры на 90 градусов
        [
            [0, 0],
            [0, 0],
            [-2, -1],
            [0, 0],
            [0, 0],
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [0, 0],
            [-1, 2],
            [0, 0],
            [0, 0],
        ],
        // поворот фигуры на 270 градусов
        [
            [0, 0],
            [0, 0],
            [2, 1],
            [0, 0],
            [0, 0],
        ],
        // поворот на 360 градусов
        [
            [0, 0],
            [0, 0],
            [1, -2],
            [0, 0],
            [0, 0],
        ],
    ],
    // #6
    [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        // поворот фигуры на 90 градусов
        [
            [-2, 2],
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // поворот на 180 градусов
        [
            [2, -2],
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
        // поворот фигуры на 270 градусов
        [
            [-2, 2],
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // поворот на 360 градусов
        [
            [2, -2],
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
    ],
    // #7
    [
        [0, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [-1, 2],
        // поворот фигуры на 90 градусов
        [
            [-1, 1],
            [-2, 0],
            [1, 1],
            [0, 0],
            [2, 0],
        ],
        // поворот на 180 градусов
        [
            [1, 1],
            [0, 2],
            [1, -1],
            [0, 0],
            [0, -2],
        ],
        // поворот фигуры на 270 градусов
        [
            [1, -1],
            [2, 0],
            [-1, -1],
            [0, 0],
            [-2, 0],
        ],
        // поворот на 360 градусов
        [
            [-1, -1],
            [0, -2],
            [-1, 1],
            [0, 0],
            [0, 2],
        ],
    ],
    // #8
    [
        [0, 0],
        [1, 0],
        [0, 1],
        [-1, 2],
        [0, 2],
        // поворот фигуры на 90 градусов
        [
            [-1, 1],
            [-2, 0],
            [0, 0],
            [2, 0],
            [1, -1],
        ],
        // поворот на 180 градусов
        [
            [1, -1],
            [2, 0],
            [0, 0],
            [-2, 0],
            [-1, 1],
        ],
        // поворот фигуры на 270 градусов
        [
            [-1, 1],
            [-2, 0],
            [0, 0],
            [2, 0],
            [1, -1],
        ],
        // поворот на 360 градусов
        [
            [1, -1],
            [2, 0],
            [0, 0],
            [-2, 0],
            [-1, 1],
        ],
    ],
]

// создает поле для тетриса
function createPlatform() {

    let tetris = document.createElement('div');
    tetris.classList.add('tetris');

    for (let i = 0; i < 200; i++) {
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }

    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);

    // записываем в переменную все элементы класса excel
    let excel = document.getElementsByClassName('excel');

    let i = 0;

    // присваиваем каждой ячейке поля координаты
    for (let y = 20; y > 0; y--) {
        for (let x = 1; x < 11; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }

}

// возвращает случайное значение в диапазоне [0; n)
function randomNumber(n) {
    return Math.round(Math.random() * (n - 1));
}


function startTetris() {

    createPlatform();

    let x = 5;
    let y = 15;

    let currentFigure;
    let figureBody;

    let counters = 0;

    // отслеживает состояние поворота фигуры
    let rotate = 1;

    // создает рандомную фигуру на поле
    function createFigure() {

        rotate = 1;
        currentFigure = counters < 4 ? randomNumber(classicFigure.length) : randomNumber(customFigure.length);

        // создает фигуру которую вернет гетрандом
        figureBody = counters < 4 ?
            [
                document.querySelector(`[posX = "${x + classicFigure[currentFigure][0][0]}"][posY = "${y + classicFigure[currentFigure][0][1]}"]`),
                document.querySelector(`[posX = "${x + classicFigure[currentFigure][1][0]}"][posY = "${y + classicFigure[currentFigure][1][1]}"]`),
                document.querySelector(`[posX = "${x + classicFigure[currentFigure][2][0]}"][posY = "${y + classicFigure[currentFigure][2][1]}"]`),
                document.querySelector(`[posX = "${x + classicFigure[currentFigure][3][0]}"][posY = "${y + classicFigure[currentFigure][3][1]}"]`),
            ]
            :
            [
                document.querySelector(`[posX = "${x + customFigure[currentFigure][0][0]}"][posY = "${y + customFigure[currentFigure][0][1]}"]`),
                document.querySelector(`[posX = "${x + customFigure[currentFigure][1][0]}"][posY = "${y + customFigure[currentFigure][1][1]}"]`),
                document.querySelector(`[posX = "${x + customFigure[currentFigure][2][0]}"][posY = "${y + customFigure[currentFigure][2][1]}"]`),
                document.querySelector(`[posX = "${x + customFigure[currentFigure][3][0]}"][posY = "${y + customFigure[currentFigure][3][1]}"]`),
                document.querySelector(`[posX = "${x + customFigure[currentFigure][4][0]}"][posY = "${y + customFigure[currentFigure][4][1]}"]`),
            ];

        // дает всем ячейкам фигуры массива figureBody класс чтобы их было видно
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }

    }

    createFigure();

    let score = 0;

    let input = document.getElementsByTagName('input')[0];
    input.value = `ваши очки : ${score}`;

    // заставляет фигуры падать
    function move() {

        let moveFlag = true;

        // координаты тела фигуры
        let coordinates = counters < 4 ?
            [
                [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
                [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
                [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
                [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
            ]
            :
            [
                [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
                [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
                [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
                [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
                [figureBody[4].getAttribute('posX'), figureBody[4].getAttribute('posY')],
            ];


        // проверка может ли фигура дальше падать
        for (let i = 0; i < coordinates.length; i++) {
            if (+coordinates[i][1] === 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                break;
            }
        }

        //
        if (moveFlag) {

            // убирает у фигуры класс figure
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            // перезаписывает координаты фигуры опуская фигуру на 1 по оси y
            figureBody = counters < 4 ?
                [
                    document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
                ]
                :
                [
                    document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[4][0]}"][posY = "${coordinates[4][1] - 1}"]`),
                ];

            // возвращаем фигуре класс figure
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }

        }
        else {

            // отнимает у фигуры класс figure и дает ей класс set
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
            }

            // проверка ряда (удаляет заполненный ряд
            for (let i1 = 1; i1 < 15; i1++) {

                let count = 0;

                // проходит по координатам оси X
                for (let i2 = 1; i2 < 11; i2++) {

                    // если ячейка в ряду имеет класс set повышаем счетчик
                    if (document.querySelector(`[posX = "${i2}"][posY = "${i1}"]`).classList.contains('set')) {

                        count++;

                        // проверка ряда на заполненность
                        if (+count === 10) {

                            score += 100;
                            input.value = `ваши очки : ${score}`;

                            // забираем у всех элементов заполненного ряда класс set
                            for (let i3 = 1; i3 < 11; i3++) {
                                document.querySelector(`[posX = "${i3}"][posY = "${i1}"]`).classList.remove('set')
                            }

                            // получаем все элементы с классом set
                            let set = document.querySelectorAll('.set');
                            let newSet = []; // будет хранить новые координаты упавших фигур после исчезновения ряда

                            //
                            for (let s = 0; s < set.length; s++) {

                                let setCoord = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];

                                // проверка чтобы не смещались ряды под исчезнувшим рядом
                                if (setCoord[1] > i1) {
                                    set[s].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX = "${setCoord[0]}"][posY = "${setCoord[1] - 1}"]`));
                                }
                            }

                            // добавляем каждому элементу класс set
                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }

                            i1--;
                        }
                    }
                }
            }

            // проверка на завершение игры
            for (let i = 1; i < 11; i++) {
                if (document.querySelector(`[posX = "${i}"][posY = "14"]`).classList.contains('set')) {
                    clearInterval(interval);
                    alert(`game over. ваши очки : ${score}`);
                    break;
                }
            }
            if (counters < 4) {
                counters++;
            }
            else {
                counters = 0;
            }
            createFigure();
        }
    }

    // опускает сгенерированную фигуру в низ на 1 координату каждые 300 милисикунд
    let interval = setInterval(() => {
        move();
    }, speed);

    let flag = true;

    // реагирует на нажатия на стрелки
    window.addEventListener('keydown', function (e) {

        // массив хранит координаты тела фигуры
        let coordinates = counters < 4 ?
            [
                [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
                [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
                [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
                [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
            ]
            :
            [
                [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
                [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
                [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
                [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
                [figureBody[4].getAttribute('posX'), figureBody[4].getAttribute('posY')],
            ];

        // определяет новое положение фигуры в пространстве
        function getNewState(a) {

            flag = true;

            // координаты нового положения фигуры (смещение вправо или влево)
            let figureNew = counters < 4 ?
                [
                    document.querySelector(`[posX = "${+coordinates[0][0] + a}"][posY = "${coordinates[0][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[1][0] + a}"][posY = "${coordinates[1][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[2][0] + a}"][posY = "${coordinates[2][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[3][0] + a}"][posY = "${coordinates[3][1]}"]`),
                ]
                :
                [
                    document.querySelector(`[posX = "${+coordinates[0][0] + a}"][posY = "${coordinates[0][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[1][0] + a}"][posY = "${coordinates[1][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[2][0] + a}"][posY = "${coordinates[2][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[3][0] + a}"][posY = "${coordinates[3][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[4][0] + a}"][posY = "${coordinates[4][1]}"]`),
                ];

            // проверка можно ли двигатся вправо или влево
            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            //
            if (flag) {

                // отнимаем класс figure
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;

                // возвращаем класс figure
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
            }
        }

        // проверка нажатия стрнлок
        if (e.keyCode == 37) {
            getNewState(-1);
        } else if (e.keyCode == 39) {
            getNewState(1);
        } else if (e.keyCode == 40) {
            move();
        } else if (e.keyCode == 38) {

            flag = true;

            // обращается к массиву координат поворота фигуры
            let figureNew = counters < 4 ?
                [
                    document.querySelector(`[posX = "${+coordinates[0][0] + classicFigure[currentFigure][rotate + 3][0][0]}"][posY = "${+coordinates[0][1] + classicFigure[currentFigure][rotate + 3][0][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[1][0] + classicFigure[currentFigure][rotate + 3][1][0]}"][posY = "${+coordinates[1][1] + classicFigure[currentFigure][rotate + 3][1][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[2][0] + classicFigure[currentFigure][rotate + 3][2][0]}"][posY = "${+coordinates[2][1] + classicFigure[currentFigure][rotate + 3][2][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[3][0] + classicFigure[currentFigure][rotate + 3][3][0]}"][posY = "${+coordinates[3][1] + classicFigure[currentFigure][rotate + 3][3][1]}"]`),
                ]
                :
                [
                    document.querySelector(`[posX = "${+coordinates[0][0] + customFigure[currentFigure][rotate + 4][0][0]}"][posY = "${+coordinates[0][1] + customFigure[currentFigure][rotate + 4][0][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[1][0] + customFigure[currentFigure][rotate + 4][1][0]}"][posY = "${+coordinates[1][1] + customFigure[currentFigure][rotate + 4][1][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[2][0] + customFigure[currentFigure][rotate + 4][2][0]}"][posY = "${+coordinates[2][1] + customFigure[currentFigure][rotate + 4][2][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[3][0] + customFigure[currentFigure][rotate + 4][3][0]}"][posY = "${+coordinates[3][1] + customFigure[currentFigure][rotate + 4][3][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates[4][0] + customFigure[currentFigure][rotate + 4][4][0]}"][posY = "${+coordinates[4][1] + customFigure[currentFigure][rotate + 4][4][1]}"]`),
                ];

            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            if (flag) {

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }

                if (rotate < 4) {
                    rotate++;
                } else {
                    rotate = 1;
                }
            }
        }

    })
}