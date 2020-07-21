export const setClient = data => {
  return {
    type: 'SET_CLIENT',
    payload: data,
  }
}

export const resetClient = () => {
  return {
    type: 'RESET_CLIENT',
  }
}