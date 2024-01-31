import createWeatherPanelSelectButtons from '../weatherPanelSelectButtons';
import { publish } from '../../pubsub';

import searchIconSrc from '../../images/icons/search.svg';

export default function createSearchBar() {
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container');

  const panelSelectButtons = createWeatherPanelSelectButtons();
  searchContainer.appendChild(panelSelectButtons.container);

  panelSelectButtons.currentButton.addEventListener('click', () => {
    publish('onCurrentButtonClick');
  });

  panelSelectButtons.forecastButton.addEventListener('click', () => {
    publish('onForecastButtonClick');
  });

  const searchBar = document.createElement('div');
  searchBar.classList.add('search-bar');
  searchContainer.appendChild(searchBar);

  const locationInput = document.createElement('input');
  locationInput.classList.add('rounded-left');
  locationInput.type = 'text';
  locationInput.placeholder = 'Search...';
  searchBar.appendChild(locationInput);

  const searchButton = document.createElement('div');
  searchButton.classList.add('search-button', 'rounded-right');

  const searchIcon = document.createElement('img');
  searchIcon.src = searchIconSrc;
  searchButton.appendChild(searchIcon);

  const errorElement = document.createElement('div');
  errorElement.innerText = 'Error message';
  errorElement.classList.add('error-display');
  searchContainer.appendChild(errorElement);

  searchBar.appendChild(searchButton);

  return {
    container: searchContainer,
    panelSelectButtons,
    currentButton: panelSelectButtons.currentButton,
    forecastButton: panelSelectButtons.forecastButton,
    searchBar,
    locationInput,
    searchButton,
    searchIcon,
    errorElement,
  };
}
