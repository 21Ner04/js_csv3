import _ from 'lodash';

export default (content) => {
  // eslint-disable-next-line no-use-before-define
  const obj = converToObject(content);
  // eslint-disable-next-line no-use-before-define
  console.log(count(obj));
  // eslint-disable-next-line no-use-before-define
  console.log(names(obj));
  // eslint-disable-next-line no-use-before-define
  console.log(maxHealth(obj));
  // eslint-disable-next-line no-use-before-define
  console.log(`Average damage: ${averageDamage(obj).map((el) => `${el.Name}: ${el.Damage}`).join(', ')}`);
  // eslint-disable-next-line no-use-before-define
  console.log(Strongest(obj));
};
function converToObject(content) {
  const currentContent = content.split('\n').slice(1).map((el) => el.split(' ')).filter((el) => el !== '');

  const obj = currentContent.map((el) => ({
    Level: Number(el[0]),
    Tower: el[1],
    Unit: el[2],
    Damage: el[3],
    Health: Number(el[4]),
    Speed: Number(el[5]),
    Cost: Number(el[6]),
  }));

  return obj;
}

// ## 1 шаг
// Посчитайте количество существ в таблице
const count = (obj) => `Count: ${obj.length}`;

// ## 2 шаг
// Выведите все виды замков существ через запятую.
// eslint-disable-next-line max-len
// Сделайте так, чтобы имя каждого замка начиналось с большой буквы.Отсортируйте список перед выводом.
function names(obj) {
  // eslint-disable-next-line no-shadow
  const names = _.uniq(obj.map(({ Tower }) => Tower.toLowerCase()));
  return `Castles: ${names.map((el) => `${el[0].toUpperCase()}${el.slice(1)}`).sort().join(', ')}`;
}

// ## 3 шаг
// Выведите существо с самым большим здоровьем.
const maxHealth = (obj) => {
  const res = _.clone(obj);
  return `Largest hp: ${res.sort((a, b) => b.Health - a.Health)[0].Unit}`;
};
// ## 4 шаг
// Выведите средний арифметический урон для каждого существа в таблице.
// Если цифры две, то их нужно сложить и разделить на 2. Если цифра одна - просто вернуть ее.
function averageDamage(obj) {
  // eslint-disable-next-line no-shadow
  const averageDamage = obj.map((el) => {
    if (el.Damage.includes('-')) {
      const values = el.Damage.split('-');
      return {
        Name: el.Unit,
        Damage: ((Number(values[0]) + Number(values[1])) / 2),
        Health: el.Health,
      };
    }
    return {
      Name: el.Unit,
      Damage: Number(el.Damage),
      Health: el.Health,
    };
  });
  return averageDamage;
}

// bin/heroes.js __fixtures__/heroes1.csv
// Count: 10
// Castles: Замок, Оплот
// Largest hp: ангел
// eslint-disable-next-line max-len
// Average damage: кентавр: 2.5, копейщик: 2, лучник: 2.5, грифон: 4.5, рыцарь: 7.5, единорог: 20, дракон: 47.5, монах: 11, кавалерист: 20, ангел: 50
// Strongest creature: ангел
