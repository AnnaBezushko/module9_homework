// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст
//  «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст
//  «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст 
// «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10,
//  где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
// Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.
// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного 
// запроса (использовать localStorage).
//// (текст заданий 3, 4 и 5 взят из сообщения ментора в Slack)


const buttonNode = document.querySelector(".button");
const resultNode = document.querySelector(".result");
document.querySelector(".page").value = localStorage.getItem('pageKey');
document.querySelector(".limit").value = localStorage.getItem('limitKey');
// проверка и запись картинок, если есть в localStorage
const listLatImg = localStorage.listImages ? displayResult(JSON.parse(localStorage.getItem('listImages'))) : '';

function displayResult(apiData) {
  let cards = "";
  apiData.forEach((item) => {
    const cardBlock = `
          <div class="card">
            <img
              src="${item.download_url}"
              class="card-image"
            />
          </div>
        `;
    cards = cards + cardBlock;
  });
  resultNode.innerHTML = cards;
}

function getData(page, limit) {
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .then((data) => {
        // console.log("data", data);
      displayResult(data);
      localStorage.setItem('pageKey', page);
      localStorage.setItem('limitKey', limit);
      // запись в localStorage
      localStorage.setItem('listImages', JSON.stringify(data));  
    });
}

function checkValues() {
  const pageNode = +document.querySelector(".page").value;
  const limitNode = +document.querySelector(".limit").value;

    if (isNaN(pageNode) ||
    pageNode > 10 ||
    pageNode < 1){
    resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    }
    else if 
    (isNaN(limitNode) ||
    limitNode > 10 ||
    limitNode < 1){
    resultNode.innerHTML = "Лимит вне диапазона от 1 до 10";
    }
    else{
    if (Number.isInteger(+limitNode)){getData(pageNode, limitNode);}
    else {
        resultNode.innerHTML = "Лимит должен быть целым числом";
    }
    
  }
}

buttonNode.addEventListener("click", () => {
  checkValues();
});
