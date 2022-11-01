// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код,
// который будет преобразовывать JSON в JS-объект и выводить его в консоль.

// JSON:

// {
//  "list": [
//   {
//    "name": "Petr",
//    "age": "20",
//    "prof": "mechanic"
//   },
//   {
//    "name": "Vova",
//    "age": "60",
//    "prof": "pilot"
//   }
//  ]
// }
// JS-объект:

// {
//   list: [
//     { name: 'Petr', age: 20, prof: 'mechanic' },
//     { name: 'Vova', age: 60, prof: 'pilot' },
//   ]
// }

const jsonString = `
{
  "list": [
    {
     "name": "Petr",
     "age": "20",
     "prof": "mechanic"
    },
    {
     "name": "Vova",
     "age": "60",
     "prof": "pilot"
    }
   ]
  }
`;

const data = JSON.parse(jsonString);
const list = data.list;
let newPersonArray = [];
for (let i = 0; i < list.length; i++) {
  newPersonArray.push({
    name: list[i].name,
    age: +list[i].age,
    prof: list[i].prof,
  });
}
result = {
  list: newPersonArray,
};
console.log(result);
