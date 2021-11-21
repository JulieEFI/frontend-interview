import "./styles/styles";
import "./assets/font_awesome/fontawesome-free-5.15.4-web/js/all";

("use strict");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const containerInput = document.querySelector(".form__container-inp");
  const input = document.querySelector("input");
  const inputBtn = document.querySelector(".form__btn");
  const container = document.querySelector(".container");
  let tel = input.value.trim();
  let data = {
    tel: tel,
  };

  async function formSend() {
    const invalid = document.querySelector(".invalid");
    const valid = document.querySelector(".valid");

    if (form.contains(invalid)) {
      swal({
        title: "Неверный формат!",
        icon: "warning",
        dangerMode: true,
      });
    } else if (form.contains(valid)) {
      container.classList.add("_sending");
      let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        form.reset();
        container.classList.remove("_sending");
        swal("Отправлено!", {
          icon: "success",
        });
      } else {
        swal({
          title: "Ошибка!",
          icon: "warning",
          dangerMode: true,
        });
        container.classList.remove("_sending");
      }
    } else {
      swal({
        title: "Заполните  поле!",
        icon: "warning",
        dangerMode: true,
      });
    }
  }

  function formValidation() {
    let regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let value = input.value.trim();
    let check = regex.test(value);

    if (!check && !(value === "")) {
      console.log(check);
      containerInput.classList.add("invalid");
      containerInput.classList.remove("valid");
      containerInput.classList.remove("normal");
    } else if (check && !(value === "")) {
      console.log(check);
      containerInput.classList.add("valid");
      containerInput.classList.remove("invalid");
      containerInput.classList.remove("normal");
    } else {
      containerInput.classList.remove("invalid");
      containerInput.classList.remove("valid");
      containerInput.classList.add("normal");
    }
  }

  input.addEventListener("blur", formValidation);
  form.addEventListener("submit", formSend);
  inputBtn.addEventListener("click", formSend);
});
