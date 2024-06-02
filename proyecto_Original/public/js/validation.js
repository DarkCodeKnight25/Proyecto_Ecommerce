var myInput = document.getElementById("txtPassword");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

myInput.onfocus = function() {
  document.getElementById("mensaje").style.display = "block";
}

myInput.onblur = function() {
  document.getElementById("mensaje").style.display = "none";
}

myInput.onkeyup = function() {
  // Validar letras minúsculas
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalido");
    letter.classList.add("valido");
  } else {
    letter.classList.remove("valido");
    letter.classList.add("invalido");
  }
  
  // Validar letras mayúsculas
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalido");
    capital.classList.add("valido");
  } else {
    capital.classList.remove("valido");
    capital.classList.add("invalido");
  }

  // Validar números
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalido");
    number.classList.add("valido");
  } else {
    number.classList.remove("valido");
    number.classList.add("invalido");
  }
  
  // Validar la cantidad de caracteres
  if(myInput.value.length >= 8) {
    length.classList.remove("invalido");
    length.classList.add("valido");
  } else {
    length.classList.remove("valido");
    length.classList.add("invalido");
  }
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#txtPassword');
    togglePassword.addEventListener('click', function (e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
    x.className += " responsive";
    } else {
    x.className = "topnav";
    }
}