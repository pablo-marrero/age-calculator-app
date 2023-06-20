var mounths = [
  (enero = {
    pos: 1,
    dia: 31,
  }),
  (febrero = {
    pos: 2,
    dia: 28,
  }),
  (marzo = {
    pos: 3,
    dia: 31,
  }),
  (abril = {
    pos: 4,
    dia: 30,
  }),
  (mayo = {
    pos: 5,
    dia: 31,
  }),
  (junio = {
    pos: 6,
    dia: 30,
  }),
  (julio = {
    pos: 7,
    dia: 31,
  }),
  (agosto = {
    pos: 8,
    dia: 31,
  }),
  (septiembre = {
    pos: 9,
    dia: 30,
  }),
  (octubre = {
    pos: 10,
    dia: 31,
  }),
  (noviembre = {
    pos: 11,
    dia: 30,
  }),
  (diciembre = {
    pos: 12,
    dia: 31,
  }),
];

document.addEventListener("DOMContentLoaded", (e) => {
  calcular("#btnForm");
});

function calcular(botton) {
  document.addEventListener("click", (e) => {
    if (e.target.matches(botton) || e.target.matches(`${botton} *`)) {
      const btn = document.querySelector(botton);

      deleteElement();
      let data = validarFecha();
      if (data) {
        calculateData(data);
        //Aca iria funcion que muestra resultado en pantalla
      }
      if (!data) {
        showData("--");
      }
    }
  });
}
//FUNCION VALIDACIÓN
function validarFecha() {
  let diaActual = new Date().getDate();
  let mesActual = new Date().getMonth() + 1;
  let anioActual = new Date().getFullYear();

  let form = document.querySelector("#formTimeLife");

  let isValid = true;
  //ACTIVAR EL FOR PARA COMPROBAR QUE ESTEN TODOS LOS CAMPOS COMPLETOS
  if (
    form.year.value.trim() == "" &&
    form.mounth.value.trim() == "" &&
    form.day.value.trim() == ""
  ) {
    for (let i = 0; i < 3; i++) {
      if (form[i].value == "") {
        createElement(form[i], "This field is required");
      }
    }
    return false;
  }

  if (form.mounth.value > mounths.length) {
    createElement(form.mounth, "Must be a valid mounth");
    isValid = false;
  }

  if (parseInt(form.year.value) > anioActual) {
    createElement(form.year, "Must be in the past");
    isValid = false;
  }

  let validDay = mounths.find((mounth) => form.mounth.value == mounth.pos);
  if (validDay) {
    if (form.day.value > validDay.dia) {
      createElement(form.day, "Must be a valid day");
      isValid = false;
    }
  }
  if (!validDay && form.day.value > 31) {
    createElement(form.day, "Must be a valid day");
  }
  if (!isValid) {
    return false;
  }
  return [form.year.value, form.mounth.value, form.day.value];
}

//FUNCION CREACION ELEMENTOS
function createElement(element, msg) {
  let fatherElement = element.parentElement;
  let spanMsgError = document.createElement("span");
  spanMsgError.id = `span${element.name}`;
  spanMsgError.innerText = msg;
  spanMsgError.classList.add("error");
  spanMsgError.classList.add("msgError");
  fatherElement.appendChild(spanMsgError);
  fatherElement.classList.add("error");
}

function deleteElement() {
  let spanError = document.querySelectorAll(".msgError");
  let labelError = document.querySelectorAll("label.error");
  for (let i = 0; i < spanError.length; i++) {
    spanError[i].remove();
    labelError[i].classList.remove("error");
  }
}

function calculateData(data) {
  let currentDay = new Date().getDate();
  let currentMounth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();

  //data[0] => year
  //data[1] => mounth
  //data[2] => day

  data[0] = parseInt(data[0]);
  data[1] = parseInt(data[1]);
  data[2] = parseInt(data[2]);

  let yearData;
  let mounthData;
  let dayData;

  let mounth = mounths.find((e) => data[1] == e.pos);

  if (data[0] == currentYear) {
    yearData = 0;

    if (data[1] == currentMounth) {
      mounthData = data[1] - currentMounth;
      if (data[2] >= currentDay) {
        dayData = data[2] - currentDay;
      }
    }

    ////////////
    if (data[1] > currentMounth) {
      if (data[2] == currentDay) {
        mounthData = data[1] - currentMounth;
      }
      if (data[2] > currentDay) {
        mounthData = data[1] - currentMounth;
        dayData = data[2] - currentDay;
      }
      if (data[2] < currentDay) {
        mounthData = data[1] - currentMounth - 1;
        dayData = 30 - currentDay + parseInt(data[2]);
      }
    }
  }

  if (data[0] < currentYear) {
    console.log("entre 0");
    if (data[1] == currentMounth) {
      if (data[2] <= currentDay) {
        dayData = currentDay - data[2];
        mounthData = data[1] - currentMounth;
      }
      if (data[2] > currentDay) {
        if (mounth.dia == 30 || mounth.dia == 28) {
          dayData = mounth.dia - data[2] + currentDay + 1;
        }
        if (mounth.dia == 31) {
          dayData = mounth.dia - data[2] + currentDay - 1;
        }
      }
      yearData = currentYear - data[0] + 1;
    }

    if (data[1] > currentMounth) {
      console.log(typeof data[1]);
      if (data[2] <= currentDay) {
        dayData = currentDay - data[2];
        mounthData = 12 - data[1] + currentDay;
      }
      if (data[2] > currentDay) {
        dayData = mounth.dia - data[2] + currentDay;
        mounthData = 12 - data[1] + currentMounth - 1;
      }
      yearData = currentYear - data[0] - 1;
    }
    if (data[1] < currentMounth) {
      console.log("entre al ultimo if");
      if (data[2] <= currentDay) {
        mounthData = currentMounth - data[1];
        dayData = currentDay - data[2];
      }
      if (data[2] > currentDay) {
        dayData = mounth.dia - data[2] + currentDay;
        mounthData = currentMounth - data[1] - 1;
      }
      yearData = currentYear - data[0];
    }
  }
  showData([yearData, mounthData, dayData]);
  console.log(`año ${yearData}, mes ${mounthData} , dia ${dayData}`);
}

function showData(data) {
  let spanDataResult = document.querySelectorAll(".sectionResult-span");
  if (data == "--") {
    spanDataResult.forEach((element) => {
      console.dir(element);
      element.innerText = element.dataset.value;
    });
  } else {
    spanDataResult.forEach((element, i) => {
      element.innerText = data[i];
    });
  }
}
