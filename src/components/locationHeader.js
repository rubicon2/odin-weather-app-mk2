export default function createLocationHeader() {
  const locationElement = document.createElement('div');
  locationElement.classList.add('location-header');

  const locationNameElement = document.createElement('div');
  locationNameElement.classList.add('location-display');
  locationElement.appendChild(locationNameElement);

  const countryElement = document.createElement('div');
  countryElement.classList.add('country-display');
  locationElement.appendChild(countryElement);

  return { container: locationElement, locationNameElement, countryElement };
}
