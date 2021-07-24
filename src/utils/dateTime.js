function calculateMonthName(month) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[month - 1];
}

function calculateDayOfWeek(day) {
  const weekNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekNames[day];
}

function convertDate(startingDateTime) {
  const [month, date, year] = startingDateTime.toLocaleDateString().split('/');
  const monthName = calculateMonthName(month);
  const weekdayName = calculateDayOfWeek(startingDateTime.getDay());
  return `${weekdayName}, ${monthName} ${date}, ${year}`;
}

function convertTime(startingDateTime) {
  let startingHour = startingDateTime.getHours();
  const startingMinute = startingDateTime.getMinutes();
  if (startingHour > 12) {
    startingHour -= 12;
  }
  let startingTime = '';
  if (startingMinute !== 0) {
    startingTime = `${startingHour}:${startingDateTime.getMinutes()}`;
  } else {
    startingTime = startingHour;
  }
  const startingTimeString = `${startingTime}${
    startingDateTime.getHours() < 12 ? 'am' : 'pm'
  }`;
  return `${startingTimeString}`;
}

export default function returnDateTime(dateTime) {
  const startingDateTime = new Date(dateTime);
  const dateAndTime = {
    date: '',
    time: '',
  };
  dateAndTime.date = convertDate(startingDateTime);
  dateAndTime.time = convertTime(startingDateTime);
  return dateAndTime;
}

