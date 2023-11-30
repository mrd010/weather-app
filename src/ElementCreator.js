// ############################################################################################################################################################
export function nameToId(name) {
  return name.toLowerCase().split(' ').join('-');
}

// ############################################################################################################################################################
export function appendChildren(element, children) {
  children.forEach((child) => element.appendChild(child));
}

// ############################################################################################################################################################
export function createElement(elementTag, elementClass, ...attributes) {
  const element = document.createElement(elementTag);
  if (elementClass) {
    element.classList.add(elementClass);
  }

  attributes.forEach((attribute) => {
    element.setAttribute(attribute[0], attribute[1]);
  });

  return element;
}

// ############################################################################################################################################################

export function createMaterialIcon(style, className, name) {
  const icon = createElement('span', className);
  icon.classList.add(`material-symbols-${style}`);
  icon.textContent = ` ${name} `;
  return icon;
}
// ############################################################################################################################################################

export const createWeatherIcon = function createWeatherIcon(name) {
  const icon = createElement('i', 'wi');
  icon.classList.add(`wi-${name}`);
  return icon;
};
