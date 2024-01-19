import dayjs from "dayjs";

function useCheckBooking() {
  const isInputDayClosed = (arr, inputDate) => {
    const inputDay = dayjs(inputDate).day();
    const daysClosed = convertDaysCloseIntoNumArr(arr);
    return daysClosed.includes(inputDay);
  };

  const convertDaysCloseIntoNumArr = (arr) => {
    const daysOfWeek = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };
    const daysCloseArr = arr.map((day) => daysOfWeek[day]);
    return daysCloseArr;
  };

  const formatTime = (number) => {
    let str = number.toString();
    let hours, minutes;

    if (str.length === 3) {
      hours = str.substring(0, 1);
      minutes = str.substring(1);
    } else if (str.length === 4) {
      hours = str.substring(0, 2);
      minutes = str.substring(2);
    } else {
      return "Invalid input";
    }

    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return { isInputDayClosed, formatTime };
}

export default useCheckBooking;
