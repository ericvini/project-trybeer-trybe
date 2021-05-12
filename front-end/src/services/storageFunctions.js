const getItem = (storageKey) => JSON.parse(localStorage.getItem(storageKey));

const setItem = (storageKey, value) => localStorage
  .setItem(storageKey, JSON.stringify(value));

export default { getItem, setItem };
