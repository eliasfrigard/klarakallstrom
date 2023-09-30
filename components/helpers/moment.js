export const getDayNumber = (date) => {
  const day = date.format('dddd').toLowerCase()

  switch (day) {
    case 'monday':
      return 0
      break;
    case 'tuesday':
      return 1
      break;
    case 'wednesday':
      return 2
      break;
    case 'thursday':
      return 3
      break;
    case 'friday':
      return 4
      break;
    case 'saturday':
      return 5
      break;
    case 'sunday':
      return 6
      break;
    default:
      break;
  }
}