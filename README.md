<p align="center">
  <img src="https://i.postimg.cc/3N3H59FN/logo.png" width="200" alt="logo">
</p>

<h1 align="center">
  Bankist App
  <br>
<p  align="center">
<a  href="https://www.w3.org/html/"  target="_blank"  rel="noreferrer"> <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"  alt="html5"  width="44"  height="52"/> </a><a  href="https://www.w3schools.com/css/"  target="_blank"  rel="noreferrer"> <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"  alt="css3"  width="44"  height="52"/> </a><a  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"  target="_blank"  rel="noreferrer"> <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"  alt="javascript"  width="44"  height="44"/> </a>
</p>
</h1>

<p align="center">
  <a href="#tech-stack-and-libraries">Tech Stack and Libraries</a> |
  <a href="#features">Features</a> |
  <a href="#code-examples">Code Examples</a> |
  <a href="#project-structure">Project Structure</a> |
  <a href="#license">License</a>
</p>

<br>

[![Thumbnail-3.png](https://i.postimg.cc/W3Gwq7LM/Thumbnail-3.png)](https://postimg.cc/BLvKdHv6)

## 🚀 Project Title
The "Bankist" project is a JavaScript application that showcases the application of various concepts learned in JavaScript, including Data Structures, Modern operators, strings, functions, working with arrays, numbers, dates, and timers. The project simulates a banking application where users can deposit and withdraw money, view their account balance, transfer money to other accounts, and view their transaction history.


## 🛠️ Tech Stack and Libraries
- JavaScript
- HTML
- CSS

## ⚙️ How it Works
[![Bankist-flowchart.png](https://i.postimg.cc/FzxkNWtB/Bankist-flowchart.png)](https://postimg.cc/K3R8558P)
The "Bankist" project is a web application that runs entirely in the browser using JavaScript, HTML, and CSS. The application features a user interface that allows users to interact with their bank account, including making deposits and withdrawals, transferring money to other accounts, and viewing their transaction history. The application also uses various JavaScript concepts, such as working with arrays, numbers, dates, and timers, to simulate the functionality of a real banking application.

## 💻 Code Examples
```js
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
```
Here is an example of a function called **displayMovements** that takes an object representing a bank account ```(acc)``` and a boolean value indicating whether to sort the movements by amount ```(sort)```. It clears a container element and then generates HTML strings for each movement using data from the acc object. Finally, it inserts the HTML strings into the container element to display the movements on a web page. This function is useful for displaying account movements in an organized way.

## 📚 Acknowledgements 
This project was created with the help of the course **"The Complete JavaScript Course 2023: From Zero to Expert!"** by **Jonas Schmedtmann**. Many of the concepts and techniques used in this project were learned from this valuable resource.


