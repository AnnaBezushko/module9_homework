// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число.
//  При клике на кнопку происходит следующее:
// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL
//  https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.
// Подсказка: получение данных из input.
// const value = document.querySelector('input').value;
// (текст заданий 3, 4 и 5 взят из сообщения ментора в Slack)

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    const result = JSON.parse(xhr.response);
    callback(result);
  };
  xhr.send();
}

const resultNode = document.querySelector(".result");
const btnNode = document.querySelector(".btn-request");

function displayResult(apiData) {
  let cards = "";
  apiData.forEach((item) => {
    const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
    cards = cards + cardBlock;
  });
  resultNode.innerHTML = cards;
}


function checkValue (){
    const value = document.querySelector("input").value;
    console.log(value);
    if (value <= 10 && value >= 1 && (Number.isInteger(+value))) {
        useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
    } else {
      resultNode.innerHTML = "число вне диапазона целых чисел от 1 до 10";
    }
}

btnNode.addEventListener("click", checkValue);
