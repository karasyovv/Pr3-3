const $btn = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');

const character = {
    name: 'Pikachu',
    hp: {
        current: 100,
        total: 100,
    },
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

const enemy = {
    name: 'Charmander',
    hp: {
        current: 100,
        total: 100,
    },
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

$btn.addEventListener('click', function () {
    console.log('Kick');
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

$btnSpecial.addEventListener('click', function () {
    console.log('Mega Kick');
    enemy.changeHP(random(40));
});

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    const { elHP, hp: { current, total } } = this;
    elHP.innerText = current + ' / ' + total;
}

function renderProgressbarHP() {
    const { hp: { current, total }, elProgressbar } = this;
    const procent = current / (total / 100);
    elProgressbar.style.width = procent + '%';

    if (current <= 20) {
        elProgressbar.classList.add('critical');
    } else if (current <= 60) {
        elProgressbar.classList.add('low');
    }
}

function changeHP(count) {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
        this.hp.current = 0;
        alert('Бідний ' + this.name + ' програв бій!');
        $btn.disabled = true;
        $btnSpecial.disabled = true;
    }

    this.renderHP();

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(log);

    const $logs = document.querySelector('#logs');
    const $p = document.createElement('p');
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, count) {
    const { name, hp: { current, total } } = firstPerson;
    const { name: playerName } = secondPerson;

    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${playerName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, и за это ${playerName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${current}/${total}]`,
        `${name} забылся, но в это время наглый ${playerName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${current}/${total}]`,
        `${name} пришел в себя, но неожиданно ${playerName} случайно нанес мощнейший удар. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, но в это время ${playerName} нехотя раздробил кулаком \\<вырезанно цензурой\\> противника. -${count}, [${current}/${total}]`,
        `${name} удивился, а ${playerName} пошатнувшись влепил подлый удар. -${count}, [${current}/${total}]`,
        `${name} высморкался, но неожиданно ${playerName} провел дробящий удар. -${count}, [${current}/${total}]`,
        `${name} пошатнулся, и внезапно наглый ${playerName} беспричинно ударил в ногу противника. -${count}, [${current}/${total}]`,
        `${name} расстроился, как вдруг, неожиданно ${playerName} случайно влепил стопой в живот соперника. -${count}, [${current}/${total}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${playerName} со скуки, разбил бровь сопернику. -${count}, [${current}/${total}]`
    ];

    return logs[random(logs.length) - 1];
}

init();
