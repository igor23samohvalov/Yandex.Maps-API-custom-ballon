import balloon from './balloon.js';

export default (state, watchedState, myMap) => {
  const inputName = document.querySelector('#inputName');
  const inputPlace = document.querySelector('#inputPlace');
  const addButton = document.querySelector('#submit-button');
  const inputComment = document.querySelector('#inputComment');
  const closeButton = document.querySelector('.close');

  myMap.events.add('click', (e) => {
    state.balloonState.coords = e.get('coords');
    [state.balloonState.x, state.balloonState.y] = e.get('pagePixels');

    ymaps.geocode(state.balloonState.coords)
      .then((res) => {
        state.balloonState.address = res.geoObjects.get(0).getAddressLine();

        state.balloonState.state = '';
        watchedState.balloonState.state = 'filling';
      });
  });

  addButton.addEventListener('click', () => {
    state.placeMarks.push(
      {
        coords: state.balloonState.coords,
        address: state.balloonState.address,
        review: {
          name: inputName.value,
          place: inputPlace.value,
          comment: inputComment.value,
          date: balloon.getDate(),
        },
      },
    );

    state.balloonState.review = {
      name: inputName.value,
      place: inputPlace.value,
      comment: inputComment.value,
      date: balloon.getDate(),
    };
    state.balloonState.state = '';
    watchedState.balloonState.state = 'newReview';
  });

  closeButton.addEventListener('click', () => {
    state.balloonState.state = '';
    watchedState.balloonState.state = 'none';
  });
};
