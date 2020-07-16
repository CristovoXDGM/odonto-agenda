export const setActive = status => {
  return {
    type: 'SET_ACTIVE',
    payload: status,
  }
}

export const setType = type => {
  return {
    type: 'SET_TYPE',
    payload: type,
  }
}