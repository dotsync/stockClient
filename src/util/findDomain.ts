export const findDomain = (marketAggregates: any) => {
    let min = Infinity, max = -Infinity
    for(let i = 0; i < marketAggregates.length; i ++) {
      const aggregateWindow = marketAggregates[i]
      const measurement = aggregateWindow.c
      if (measurement < min) min = measurement
      if (measurement > max) max = measurement
    }
    if (min > Infinity || max < -Infinity) {
      return [0, 1000]
    } else {
      return [min, max]
    }
  }