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
  if (elementClass !== undefined) {
    element.classList.add(elementClass);
  }

  attributes.forEach((attribute) => {
    element.setAttribute(attribute[0], attribute[1]);
  });

  return element;
}

// ############################################################################################################################################################
export function createElementWithClasses(elementTag, elementClassNames, ...attributes) {
  const element = document.createElement(elementTag);
  if (elementClassNames !== undefined) {
    element.setAttribute('class', elementClassNames);
  }

  attributes.forEach((attribute) => {
    element.setAttribute(attribute[0], attribute[1]);
  });

  return element;
}

// ############################################################################################################################################################
export const createContainer = function createContainer(classNames) {
  const container = createElement('div', undefined);
  if (classNames !== undefined) {
    container.setAttribute('class', classNames);
  }

  return container;
};

// ############################################################################################################################################################

export function createMaterialIcon(style, className, name) {
  const icon = createElement('span', className);
  icon.classList.add(`material-symbols-${style}`);
  icon.textContent = ` ${name} `;
  return icon;
}
// ############################################################################################################################################################

export const createWeatherIcon = function createWeatherIcon(name, className = '') {
  const icon = createElement('i', 'wi');
  icon.classList.add(`wi-${name}`);
  if (className !== '') {
    icon.classList.add(className);
  }
  return icon;
};
