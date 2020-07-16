export const setAppointment = data => {
  return {
    type: 'SET_APPOINTMENT',
    payload: data,
  }
}

export const resetAppointment = () => {
  return {
    type: 'RESET_APPOINTMENT',
  }
}