export const el = (tag, props = {}, ...children) => {
    const element = document.createElement(tag);
    Object.assign(element, props);
    element.append(...children);
    return element;
};
