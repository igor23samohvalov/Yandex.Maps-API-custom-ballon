const balloonHeaderAddress = document.querySelector('.address');
const balloon = document.querySelector('.balloon');
const balloonBody = document.querySelector('.balloon-body');
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
  balloonBody.innerHTML += `
    <div class='body-container'>
      <div>
        <div class='name'>${data.name}</div>
        <div class='place'>${data.place} ${data.date}</div>
      </div>
      <div class='comment'>${data.comment}</div>
    </div>  
  `;
}

function loadReviews({ placeMarks, balloonState }) {
  balloonBody.innerHTML = '';
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

  if (clientY - y < balloon.clientHeight) {
    y = clientY - balloon.clientHeight;
  }
  if (clientX - x < balloon.clientWidth) {
    x = clientX - balloon.clientWidth;
  }

  balloonHeaderAddress.textContent = address;
  balloonBody.innerHTML = '';
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
