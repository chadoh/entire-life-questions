export const get = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const set = (key, state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(key, serializedState);
}

export const rm = key => {
  localStorage.removeItem(key)
}
