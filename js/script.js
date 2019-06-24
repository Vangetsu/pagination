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
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

/* 
<div class="pagination">
        <ul>
          <li>
            <a class="active" href="#">1</a>
          </li>
           <li>
            <a href="#">2</a>
          </li>
           <li>
            <a href="#">3</a>
          </li>
           <li>
            <a href="#">4</a>
          </li>
           <li>
            <a href="#">5</a>
          </li>
        </ul>
      </div>
*/

function appendPageLinks(list) {
  let numOfPages = list.length / itemsPerPage;
  let page = document.querySelector('.page');
  let div = document.createElement('div');
  let pageLinks = `<div class="pagination">
  <ul>`;

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
  </ul>
</div>`
  div.innerHTML = pageLinks;
  page.appendChild(div);
}

appendPageLinks(listItems);


// Remember to delete the comments that came with this file, and replace them with your own code comments.