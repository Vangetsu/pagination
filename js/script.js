/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
   Global variables that store the DOM elements 
   needed to reference and/or manipulate. 
   
   Adım adım kod üzerinden gitmek en mantıklısı olacak
   Bu ilk kısımda öncelikle Dom elementlerini kaydetmek için global değişkenler tanımlıyoruz.
   Bütün öğrencilerin olduğu kısım aslında başlı başına bir unordered liste (ul) ve bu listenin class adı "student-list"
   Aşağıda bir listItems değişkeni tanımlıyoruz ve queryselector ile bütün child elementleri bu değişkene kaydediyoruz.
   Anladığım kadarı ile bu bir array oluyor. ItemspPerPage değişkeni de her sayfada gözükecek kişi sayısını belirtiyor.

***/
const listItems = document.querySelector('.student-list').children;
const itemsPerPage = 10;

/*** 
   `showPage` function hides all of the items in the 
   list except for the ten you want to show.

   Sonrasında ilk fonksiyonumuzu tanımlıyoruz.
   ShowPage fonksiyonu iki değişken kabul ediyor.
   Birincisi bir liste, ikincisi ise sayfa sayısı.
   İçerisinde iki adet değişken tanımlanmış startIndex ve endIndex.
   Örneğin sayfa sayısı 3 olarak girer isek
   startIndex = 20 , endIndex = 30 oluyor
   yani 3. sayfanın sınırlarını belirlemiş oluyoruz.
   sonrasındaki for döngüsü liste girdisinin uzunluğuna göre
   Örneğin 55 child yani 55 kişi varsa
   0 dan 54 e kadar yani 55 kere çalışıyor ve her defasında
   eğer element 20-30 aralığında olup olmadığına bakıyor
   20-30 aralığındakilerin display style değerini boş
   geriye kalanların ise (0-19 ve 30-55) none yaparak
   sadece üçüncü sayfaya özgü kişileri görünür hale getiriyor
  
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

// buradaki showPage in amacı sayfa ilk açıldığında 1 numaralı sayfayı görünür kılmak.

/*** 
   Creates the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.

   Bu kısımda tanımlanan ikinci fonksyion değişken olarak sadece bir liste kabul ediyor.
   numOfPages değişkeni listenin uzunluğuna göre kaç sayfa olması gerektiğini hesap edip kaydediyor
   Öncelikle quesy selector ile class ı page olan element yani div seçiliyor ve page olarak kaydediliyor
   sonrasında bir div elementi oluşturularak div olarak kaydediliyor
   sonrasında pageLinks adlı bir string tanımlanıyor
   sayfanın en altındaki pagination kısmını oluşturmak için bir liste yaratacağız.
***/
function appendPageLinks(list) {
  let numOfPages = list.length / itemsPerPage;
  let page = document.querySelector('.page');
  let div = document.createElement('div');
  let pageLinks = `<ul>`;

  // loops through the number of pages and adds a link 

  /***buradaki for döngüsü sayfa sayısı kadar çalışıyor ve her çalıştığında yeni bir
  sayfa numarası ile yeni bir link ekliyor (ilk eklenen linkin class'ı (yani sayfa 1 linki) active olarak atanıyor)
  ***/
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
  </ul>`; // döngü bittikten sonra string sonuna kapanış elementi eklenerek bitiriliyor.

  // adds links to the div and appends it to the page
  div.innerHTML = pageLinks; // pageLinks stringi oluşturduğumuz div'e innerhtml olarak atanıyor ve class adı pagination yapılıyor
  div.className = 'pagination';
  page.appendChild(div); 
  
  //bu komut ile oluşturduğumuz div'i classı page olan div'e son child olarak append ediyor yani ekliyoruz ve pagination linklerini oluşturmuş oluyoruz.

  /*** Gives the links a click event listener and opens the coresponding page 
   
  Aşağıdaki kısımda öncelikle oluşturduğumuz div içindeki tüm linkler (<a>'lar) links adlı değişkene kaydediliyor.
  Sonrasındaki for döngüsü içerisinde links arrayinin uzunluğu kadar tekrarla her bir linke click eventlistener ekleniyor
  Eventlistener gerçekleşmesi durumunda öncelikle her bir linkin class ı siliniyor
  Sonra click alan linkin class ı aktif olarak ayarlanıyor
  showPage fonksiyonu çağrılarak ve click linkinin text içeriği sayfa sayısı olarak girilerek
  İlgili sayfanın listesi ekranda görünür hale geliyor.
  
   ***/ 

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

appendPageLinks(listItems); // fonksiyonu tanımladıktan sonra bir kere çağırıyoruz ki içerisindeki işlemler sayfa yüklendiğinde bir kere gerçekleşmiş olsun

/*
 * Creates a search bar, appends it to the top of the page,
 * then listens for any submit events by the user and 
 * calls the `searchItem` function
 * 
 * Bu kısımda sayfanın üst kısmına bir arama barı eklemek için fonksiyon tanımlıyoruz.
 * Öncelikle page header ı seçerek header sabitine kaydediyoruz
 * Sonra searchDiv adlı bir form elementi oluşturuyoruz.
 * searchDiv innerHTMl'i tanımlıyoruz input olarak, input'a placeholder ekliyor devamına da bir buton koyuyoruz.
 * searchDiv'in class adını student-search yapıyoruz.
 * header a child olarak ekliyoruz.
 * 
 * searchDiv'e submit evenlistener ekliyoruz.
 * submite tıklanması durumunda default işlemin gerçekleşmemesi için preventdefault metodunu kullanıyoruz.
 * searchValue adlı değişkene input ile girilen değeri kaydediyoruz
 * arkasına searchItem fonksiyonunu çağırıyoruz (bu verilerle)
 * input kısmının değerini siliyoruz (eski arama değerini silmek için)
 * 
 */
function appendSearchBar() {
  const header = document.querySelector('.page-header');
  const searchDiv = document.createElement('form');
  searchDiv.innerHTML = `<input placeholder="Search for students..."><button>Search</button>`;
  searchDiv.className = 'student-search';
  header.appendChild(searchDiv);

  searchDiv.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchValue = e.target[0].value;
    searchItem(listItems, searchValue);
    e.target[0].value = '';
  });
}

/*
 * Takes the input from the user and displays any of the 
 * names that any similar combination of letters in the name
 * also changes the paginator to reflect the amount of results
 * https://www.w3schools.com/howto/howto_js_filter_lists.asp was used for help
 * 
 * 
 * Bu kısımda arama fonksiyonu tanımlıyoruz iki değişken kabule diyor (liste, aramadeğeri)
 * Öncelikle 6 tane değer tanımlıyoruz (h3, txtValue, filter, page, div, alert;)
 * Sonra searchresult adlı boş bir array tanımlıyoruz
 * class ı page olan elementi seçip page değerine kaydediyoruz
 * Arama değerini büyük harfe çevirip filter değerine kaydediyoruz
 * sonraki for döngüsü içinde listItems array i içerisindeki her bir h3 tagli element
 * öncelikle h3 değerine kaydediliyor sonrasında bu h3 elementinin textcontenti veya innextext i
 * txtValue değerine kaydediliyor. txtValue değerinin uppercase hali sonraki if kontrolü ile
 * indexof metodu ile kontrol ediliyor eğer eğer değerler eşse listenin n inci elemanı
 * Searchresults arrayine ekleniyor push komutu ile değilse display property si none olarak ayarlanıyor.
 * döngü ile bütün studen-itemlar için bu işlem bir kere yapılıyor.
 * 
 */
function searchItem(list, searchValue) {
  let h3, txtValue, filter, page, div, alert;
  let searchResults = [];
  page = document.querySelector('.page');
  filter = searchValue.toUpperCase();
  for (let i = 0; i < list.length; i++) {
    h3 = list[i].getElementsByTagName('h3')[0];
    txtValue = h3.textContent || h3.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      searchResults.push(list[i]);
    } else {
      list[i].style.display = 'none';
    }
  }
  showPage(searchResults, 1);  // showpage komutu çağrılarak searchresults arrayi arama sonucu olarak 1 sayfaya basılıyor.


  /*** checks if there are 0 results and displays message if true
   
  Bu kısımda eğer searchresults array length 1 den kucukse yani arama sonucsıuzsa ya da undefined ise
  ve ikinci if e göre page in 2. child ının class name i  alert değilse
  bir div elementi yaratılıp div değişkenine kaydediliyor
  class ismi alert olarak ayarlanıyor
  bir h1 elementi yaratılıyor ve alert değerine kaydediliyor
  alertin textcontenti "no results matched your search" olarak kaydediliyor
  alert dive, d,vde page e append edilerek ekleniyor
  aksi durumda eğer page in 2. child ının class adı alert ise
  page in 2. child ı remove ile siliniyor
  arkasına bu ifler den bağımsız olarak pagination elementi siliniyor
  appendpagelinks fonksiyonu searchresults girdisi ile çağrılarak
  arama sonuçlarına göre bir pagination sayfa altına ekleniyor
  ***/ 


  if (searchResults.length < 1 || searchResults === undefined) {
    if (page.children[2].className !== 'alert') {
      div = document.createElement('div');
      div.className = 'alert';
      alert = document.createElement('h1');
      alert.textContent = 'No results matched your search';
      div.appendChild(alert);
      page.appendChild(div);
    }
  } else if (page.children[2].className === 'alert') {
      page.children[2].remove();
  }
  

  document.querySelector('.pagination').remove();
  appendPageLinks(searchResults);

}


appendSearchBar(); //appendsearchbar fonksiyonu çağrılıyor. ilk yüklemede yukarıya search bar ı eklemek için.