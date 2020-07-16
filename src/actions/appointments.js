export const setAppointments = appointments => {
  return {
    type: 'SET_APPOINTMENTS',
    payload: appointments,
  }
}