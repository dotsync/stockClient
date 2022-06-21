export const getTimeStampFromUnix = (unixDate: string | number) => {
    const date = new Date(unixDate).toLocaleString()
    const timeArray = date.split(' ')
    const dateSplit = timeArray[0].split("/")
    const dayAndMonth = dateSplit[0]+'/'+dateSplit[1]
    const monthAndYear = dateSplit[0]+'/'+dateSplit[2]

    const timeMap = {
      date: {
        localeString: date,
        full: timeArray[0],
        dayAndMonth: dayAndMonth,
        monthAndYear: monthAndYear
      },
      time: timeArray[1],
      amPm: timeArray[2],
    }
    return timeMap
  }