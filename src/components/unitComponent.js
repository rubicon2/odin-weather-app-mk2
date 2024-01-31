export default function createUnitComponent(unit) {
  const containerElement = document.createElement('div');
  containerElement.classList.add('unit-component');

  const measurementReadingElement = document.createElement('span');
  measurementReadingElement.classList.add('measurement-reading');
  containerElement.appendChild(measurementReadingElement);

  const measurementUnitElement = document.createElement('span');
  measurementUnitElement.classList.add('measurement-unit');
  measurementUnitElement.innerText = unit;
  containerElement.appendChild(measurementUnitElement);

  return { containerElement, measurementReadingElement };
}

export const degreeSymbol = '\u00B0';
