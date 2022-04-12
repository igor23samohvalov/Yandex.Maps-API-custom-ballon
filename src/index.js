import './css/main.css';
import view from './view.js';

function init() {
  const myMap = new ymaps.Map('map', {
    center: [59.95, 30.31],
    zoom: 11,
  });

  const customItemContentLayout = ymaps.templateLayoutFactory.createClass(
    '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>'
    + '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>'
    + '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>',
  );
  const myClusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: customItemContentLayout,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 250,
    clusterBalloonContentLayoutHeight: 160,
    clusterBalloonPagerSize: 5,
  });

  myMap.geoObjects.add(myClusterer);

  const state = {
    balloonState: {
      state: 'none',
      x: '',
      y: '',
      coords: [],
      address: '',
      review: {},
    },
    placeMarks: [],
  };

  view(state, myMap, myClusterer);
}

ymaps.ready(init);
