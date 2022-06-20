export const getTimeStampFromUnix = (unixDate: string | number) => {
    const date = new Date(unixDate).toLocaleString()
    const timeArray = date.split(' ')
    const dateSplit = timeArray[0].split("/")
    const monthAndYear = dateSplit[0]+'/'+dateSplit[2]
    const timeMap = {
      date: {
        full: timeArray[0],
        monthAndYear: monthAndYear
      },
      time: timeArray[1],
      amPm: timeArray[2],
    }
    return timeMap
  }