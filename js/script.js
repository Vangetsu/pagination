/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Global variables that store the DOM elements 
   needed to reference and/or manipulate. 
***/
const listItems = document.querySelector('.student-list').children;
const itemsPerPage = 10;

/*** 
   `showPage` function hides all of the items in the 
   list except for the ten you want to show.
***/
function showPage(list, page) {
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
}

showPage(listItems, 1);

/*** 
   Creates the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
  let numOfPages = list.length / itemsPerPage;
  let page = document.querySelector('.page');
  let div = document.createElement('div');
  let pageLinks = `<ul>`;

  // loops through the number of pages and adds a link 
  for (let i = 0; i < numOfPages; i++) {
    if (i === 0) {
      pageLinks += `
    <li>
      <a class="active" href="#">${i + 1}</a>
    </li>`
    } else {
      pageLinks += `
    <li>
      <a href="#">${i + 1}</a>
    </li>`
    }
  }
  pageLinks += `
  </ul>`;
  // adds links to the div and appends it to the page
  div.innerHTML = pageLinks;
  div.className = 'pagination';
  page.appendChild(div);

  // Gives the links a click event listener and opens the coresponding page
  let links = div.querySelectorAll('a');
  for (let i = 0; i < links.length; i++) {
    (function () {
      links[i].addEventListener('click', (e) => {
        for (let j = 0; j < links.length; j++) {
          links[j].className = '';
        }
        e.target.className = 'active';
        showPage(listItems, e.target.textContent);
      },false)
    })();
  }
}

appendPageLinks(listItems);