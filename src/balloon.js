const balloonHeaderAddress = document.querySelector('#balloon-header-address');
const balloon = document.querySelector('#balloon');
const balloonReviews = document.querySelector('.balloon-reviews');
const inputName = document.querySelector('#inputName');
const inputPlace = document.querySelector('#inputPlace');
const inputComment = document.querySelector('#inputComment');

function hideBalloon() {
  balloon.style.display = 'none';
}

function getDate() {
  const now = new Date();
  return `${now.getFullYear()}.${now.getMonth()}.${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

function balloonClearFields() {
  inputName.value = '';
  inputPlace.value = '';
  inputComment.value = '';
}

function addReview(data) {
  balloonReviews.innerHTML += `
    <div class='balloon-reviews-container'>
      <div>
        <div class='balloon-reviews-name'>${data.name}</div>
        <div class='balloon-reviews-place'>${data.place} ${data.date}</div>
      </div>
      <div class='balloon-reviews-comment'>${data.comment}</div>
    </div>  
  `;
}

function loadReviews({ placeMarks, balloonState }) {
  balloonReviews.innerHTML = '';
  const currentMarks = placeMarks.filter(({ coords }) => coords.join('') === balloonState.coords.join(''));
  if (currentMarks.length !== 0) {
    currentMarks.forEach(({ review }) => {
      addReview(review);
    });
  }
}

function openBalloon({ x, y, address }) {
  const clientY = document.documentElement.clientHeight;
  const clientX = document.documentElement.clientWidth;
  if (clientY - y < 516) {
    y = clientY - 516;
  }
  if (clientX - x < 379) {
    x = clientX - 379;
  }

  balloonHeaderAddress.textContent = address;
  balloonReviews.innerHTML = '';
  balloon.style.display = 'flex';
  balloon.style.left = `${x}px`;
  balloon.style.top = `${y}px`;
}

export default {
  hideBalloon,
  getDate,
  balloonClearFields,
  openBalloon,
  addReview,
  loadReviews,
};
