const DATA_URL = '/data';
const IP_URL = '/ip';
let defaultUrl = '192.168.66.220';

const form = document.querySelector('.settings__form');
const ipForm = document.querySelector('#ip');
ipForm.placeholder = `Дефолтный айпи: ${defaultUrl}`;

// Валидация формы
ipForm.addEventListener('invalid', () => {
  if (ipForm.validity.valueMissing) {
    ipForm.setCustomValidity('Обязательное поле');
  } else {
    ipForm.setCustomValidity('');
  }
});

const getIp = (url, newIp) => {
  try {
    fetch(url, {
      newIp,
    })
      .then((response) => response.json())
      .then((newIp) => {
        // При успешной отправке в инпут вывести сообщение
        ipForm.value = `Успешно! Новый айпи: ${newIp}`;
        defaultUrl = newIp;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error)
  }
}

// Событие отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  getIp(defaultUrl,ipForm.value);
});

// Get
const getData = (onSuccess,url) => {
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        onSuccess(data);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error)
  }
};

const inputs = document.querySelectorAll('.detector-input');

const viewData = (data) => {
  data.data.map((value,index) => {
    inputs[index].value = value;
  })
}

let timer = () =>  setTimeout(function tick() {
  getData(viewData,DATA_URL);
  timer = setTimeout(tick, 100);
}, 100);

const buttonGetData = document.querySelector('#button-get-data');

let start = false;
buttonGetData.addEventListener('click', () => {
  if (!start) {
    timer(); // start
    start = true;
  }
  else {
    clearTimeout(timer); // Stop
    start = false;
  }
});
