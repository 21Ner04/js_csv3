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

// bin/heroes.js __fixtures__/heroes1.csv
// Count: 10
// Castles: Замок, Оплот
// Largest hp: ангел
// eslint-disable-next-line max-len
// Average damage: кентавр: 2.5, копейщик: 2, лучник: 2.5, грифон: 4.5, рыцарь: 7.5, единорог: 20, дракон: 47.5, монах: 11, кавалерист: 20, ангел: 50
// Strongest creature: ангел