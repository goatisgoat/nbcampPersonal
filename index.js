window.addEventListener("DOMContentLoaded", function () {
  getApiInfo();
});

const cardsContainer = document.querySelector(".cardsContainer");

// api가져오기
const getApiInfo = async () => {
  // 영화
  const movies = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68",
    },
  };

  let url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  let response = await fetch(url, movies);
  let data = await response.json();
  console.log(data)

  // 영화 카드 출력 함수
  listing(data);
};

// 영화 카드 출력 함수
const listing = (data) => {
  document.querySelector(".cardsContainer").innerHTML = "";

  let rows = data["results"];
  // 인기순정렬
  rows.sort((a, b) => b.popularity - a.popularity);

  rows.forEach((item) => {
    // 카드div생성
    let nweDiv = document.createElement("div");
    nweDiv.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1280/${item.backdrop_path})`;
    nweDiv.classList.add("card");
    cardsContainer.appendChild(nweDiv);

    // 타이틀 div생성
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("cardTitle");
    nweDiv.appendChild(titleDiv);

    //타이틀 이미지
    let titleImgDiv = document.createElement("div");
    titleImgDiv.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1280/${item.poster_path})`;
    titleImgDiv.classList.add("cardImg");
    titleDiv.appendChild(titleImgDiv);

    // 타이틀 제목
    let titleH2Div = document.createElement("div");
    let titleH2 = document.createElement("h2");
    let textNode = document.createTextNode(`${item.title}`)
    titleH2Div.classList.add("cardTitleH2");
    titleH2.appendChild(textNode)
    titleH2Div.appendChild(titleH2);
    titleDiv.appendChild(titleH2Div);


    // 줄거리 div생성
    let storyDiv = document.createElement("div");
    let overViewP = document.createElement("p");
    let overViewPNode = document.createTextNode(`${item.overview}`)
    storyDiv.classList.add("cardTitle");
    storyDiv.classList.add("cardOverViewP");
    overViewP.appendChild(overViewPNode)
    storyDiv.appendChild(overViewP);
    nweDiv.appendChild(storyDiv);

    //카드 맨 밑의 내용물 div생성
    let bottomDiv = document.createElement("div");
    //add icon
    bottomDiv.setAttribute("class", "fa-solid fa-star");
    let bottomP = document.createElement("p");
    let bottomPNode = document.createTextNode(`${item.vote_average}`)
    bottomP.appendChild(bottomPNode);
    bottomDiv.appendChild(bottomP);
    bottomDiv.classList.add("cardTitle");
    bottomDiv.classList.add("cardBottom");
    nweDiv.appendChild(bottomDiv);

    // value값 지정
    let valueAttr = document.createAttribute("value");
    valueAttr.value = item.id;
    nweDiv.setAttributeNode(valueAttr);
  });

  // 카드 클릭할때 알람 창 생성
  const card = document.querySelectorAll(".card");
  card.forEach((item) => {
    item.addEventListener("click", (e) => {
      alert(e.currentTarget.getAttribute("value"));
    });
  });
};



// 검색기능
const inputId = document.querySelector("#inputId");

const inputChange = () => {
  // console.log('change', inputId.value )
  if (inputId.value === '') {
    getApiInfo()
  } else if(inputId.value){
   seatchInfo(inputId.value);
  }
};

//검색 api
const seatchInfo = async (search) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68",
    },
  };

  let Url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
  let searchInfo = await fetch(Url, options);
  let getSearch = await searchInfo.json();

  listing(getSearch);
};
