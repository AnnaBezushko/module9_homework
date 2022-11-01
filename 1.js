// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет
// преобразовывать XML в JS-объект и выводить его в консоль.

// XML:

// <list>
//  <student>
//    <name lang="en">
//      <first>Ivan</first>
//      <second>Ivanov</second>
//    </name>
//    <age>35</age>
//    <prof>teacher</prof>
//  </student>
//  <student>
//    <name lang="ru">
//      <first>Петр</first>
//      <second>Петров</second>
//    </name>
//    <age>58</age>
//    <prof>driver</prof>
//  </student>
// </list>
// JS-объект:

// {
//  list: [
//    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
//    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
//  ]
// }

const parser = new DOMParser();
const xmlString = `
<list>
 <student>
   <name lang="en">
     <first>Ivan</first>
     <second>Ivanov</second>
   </name>
   <age>35</age>
   <prof>teacher</prof>
 </student>
 <student>
   <name lang="ru">
     <first>Петр</first>
     <second>Петров</second>
   </name>
   <age>58</age>
   <prof>driver</prof>
 </student>
</list>
JS-объект:
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentNode = listNode.querySelector("student");

const studentNodeAll = listNode.querySelectorAll("student");
const list = [];
function getStudent(studentNode) {
  const nameNode = studentNode.querySelector("name");
  const firstNode = nameNode.querySelector("first");
  const secondNode = nameNode.querySelector("second");
  const ageNode = studentNode.querySelector("age");
  const profNode = studentNode.querySelector("prof");

  const langAttr = nameNode.getAttribute("lang");

  list.push({
    name: firstNode.textContent + " " + secondNode.textContent,
    age: +ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr
  });
}
studentNodeAll.forEach(getStudent);

console.log({
  list
});
