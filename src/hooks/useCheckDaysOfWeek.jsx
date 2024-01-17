import dayjs from "dayjs";

function useCheckDaysOfWeek() {

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

  return { isInputDayClosed };
}

export default useCheckDaysOfWeek;
