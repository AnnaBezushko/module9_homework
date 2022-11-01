// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести
//  любое число. При клике на кнопку происходит следующее:
// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст
//  «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL
// https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.
// Подсказка: получение данных из input.
// const value = document.querySelector('input').value;
// (текст заданий 3, 4 и 5 взят из сообщения ментора в Slack)


const buttonNode = document.querySelector(".button");
const resultNode = document.querySelector(".result");

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

function getData(width, height) {
  // fetch(`https://picsum.photos/${width}/${height}`) - URL из задания не работает, поэтому для проверки кода я взяла другой URL
  fetch(`https://picsum.photos/v2/list/?limit=${width - height}`)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .then((data) => {
      //   console.log("data", data);
      displayResult(data);
    });
}

function checkValues() {
  const widthNode = +document.querySelector(".width").value;
  const heightNode = +document.querySelector(".height").value;

  if (isNaN(widthNode) ||
  isNaN(heightNode) ||
    widthNode > 300 ||
    widthNode < 100 ||
    heightNode > 300 ||
    heightNode < 100
  ) {
    resultNode.innerHTML = "одно из чисел вне диапазона от 100 до 300";
    // console.log(widthNode, heightNode);
  } else {
    getData(widthNode, heightNode);
  }
}





buttonNode.addEventListener("click", () => {
  checkValues();
});
