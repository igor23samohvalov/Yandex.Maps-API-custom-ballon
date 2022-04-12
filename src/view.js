import onChange from 'on-change';
import balloon from './balloon.js';
import loadListeners from './listeners.js';
import placemark from './placemark.js';

export default (state, myMap, myClusterer) => {
  const watchedState = onChange(state, (path, value) => {
    switch (value) {
      case 'filling':
        balloon.balloonClearFields();
        balloon.openBalloon(state.balloonState);
        balloon.loadReviews(state);
        break;
      case 'newReview':
        placemark.addPlaceMark(state.balloonState, state, myMap, myClusterer, watchedState);
        placemark.addToLocalStorage(state);
        watchedState.balloonState.state = 'filling';
        break;
      case 'none':
      default:
        balloon.hideBalloon();
        state.balloon = {
          state: 'none',
          x: '',
          y: '',
          coords: [],
          address: '',
          reviews: [],
        };
        break;
    }
  });

  loadListeners(state, watchedState, myMap, myClusterer);
  placemark.loadFromLocalStorage(state, myMap, myClusterer, watchedState);
};
