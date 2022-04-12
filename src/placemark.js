import balloon from './balloon.js';

function addPlaceMark(data, { balloonState }, myMap, myClusterer, watchedState) {
  const placemark = new ymaps.Placemark(data.coords, {
    balloonContentHeader: data.review.place,
    balloonContentBody: data.address,
    balloonContentFooter: balloon.getDate(),
  });
  myMap.geoObjects.add(placemark);
  myClusterer.add(placemark);

  placemark.events.add('click', (event) => {
    event.preventDefault();
    [balloonState.x, balloonState.y] = event.get('pagePixels');
    // eslint-disable-next-line no-underscore-dangle
    balloonState.coords = event.get('target').geometry._coordinates;
    balloonState.address = data.address;

    balloonState.state = '';
    watchedState.balloonState.state = 'filling';
  });
}

function addToLocalStorage({ placeMarks }) {
  localStorage.placemarks = JSON.stringify(placeMarks);
}

function loadFromLocalStorage(state, myMap, myClusterer, watchedState) {
  if (localStorage.getItem('placemarks') !== null) {
    state.placeMarks = JSON.parse(localStorage.getItem('placemarks'));
    state.placeMarks.forEach((placeMark) => {
      addPlaceMark(placeMark, state, myMap, myClusterer, watchedState);
    });
  }
}

export default {
  addPlaceMark,
  addToLocalStorage,
  loadFromLocalStorage,
};
