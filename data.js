import dayjs from 'dayjs';

export const steps = [
  {
    date: '2022-05-22',
    steps: 2000,
  },
  {
    date: '2022-05-17',
    steps: 5000,
  },
  {
    date: '2022-05-16',
    steps: 3000,
  },
  {
    date: '2022-05-15',
    steps: 1912,
  },
  {
    date: '2022-05-13',
    steps: 15256,
  },
  {
    date: '2022-05-11',
    steps: 9281,
  },
  {
    date: '2022-05-09',
    steps: 3266,
  },
  {
    date: '2022-05-05',
    steps: 2768,
  },

  {
    date: '2022-05-01',
    steps: 6313,
  },
  {
    date: '2022-04-31',
    steps: 11033,
  },
  {
    date: '2022-04-29',
    steps: 8835,
  },
];

export const formatData = (data, key) => {
  let formattedData = {};

  for (let i = 0; i < data.length; i++) {
    const isNextDataNill = i === 0 || i === data.length - 1;

    formattedData[data[i].date] = {
      value: data[i][key],
      nextDate: isNextDataNill ? null : data[i - 1].date,
    };
  }
  return formattedData;
};

export const stepsData = {
  data: {
    '2022-04-29': {nextDate: null, value: 8835},
    '2022-04-31': {nextDate: '2022-05-01', value: 11033},
    '2022-05-01': {nextDate: '2022-05-05', value: 6313},
    '2022-05-05': {nextDate: '2022-05-09', value: 2768},
    '2022-05-09': {nextDate: '2022-05-11', value: 3266},
    '2022-05-11': {nextDate: '2022-05-13', value: 9281},
    '2022-05-13': {nextDate: '2022-05-15', value: 15256},
    '2022-05-15': {nextDate: '2022-05-16', value: 1912},
    '2022-05-16': {nextDate: '2022-05-17', value: 3000},
    '2022-05-17': {nextDate: '2022-05-22', value: 5000},
    '2022-05-22': {nextDate: null, value: 2000},
  },

  requestParam: {
    lastDate: '',
    pageNo: 1,
    pageSize: 10,
    reachedEnd: false,
  },
};

export const LENGTH_OF_CHART = {
  week: 7,
  month: 28,
};

export const createChartData = (startDate, type = 'week', data) => {
  const chartData = [];

  let lastItemValue = 0;
  let valueDiffPerIndex = 0;

  for (let i = 0; i < LENGTH_OF_CHART[type]; i++) {
    const date = dayjs(startDate).add(i, 'day');
    const dateString = date.format('YYYY-MM-DD');

    if (data[dateString]) {
      const {value, nextDate} = data[dateString];

      if (value) {
        chartData.push({
          date: dateString,
          value,
          displayDot: true,
        });
      }

      if (nextDate) {
        const diffBetNextAndCurrentDates =
          dayjs(nextDate).diff(date, 'day') + 1;
        console.log({diffBetNextAndCurrentDates});
        if (diffBetNextAndCurrentDates > 1) {
          lastItemValue = value;
          valueDiffPerIndex =
            (data[nextDate].value - value) / diffBetNextAndCurrentDates;
          console.log(data[nextDate].value - value, valueDiffPerIndex);
        } else {
          lastItemValue = 0;
          valueDiffPerIndex = 0;
        }
      } else {
        lastItemValue = 0;
        valueDiffPerIndex = 0;
      }
    } else {
      if (valueDiffPerIndex) {
        const itemValue = lastItemValue + valueDiffPerIndex;
        lastItemValue = itemValue;

        chartData.push({
          date: dateString,
          value: itemValue,
          displayDot: false,
        });
        continue;
      }

      chartData.push({
        date: dateString,
        value: null,
        displayDot: false,
      });
    }
  }

  return chartData;
};

export const getXAxisValues = (data, type) => {
  const yAxisValues = [];

  const next = type === 'week' ? 1 : 7;

  for (let i = 0; i < data.length; i = i + next) {
    const dayName = dayjs(data[i].date).format('ddd');
    const dayWithMonth = dayjs(data[i].date).format('DD MMM');

    yAxisValues.push({
      label: type === 'week' ? dayName : dayWithMonth,
      label2: type === 'week' ? dayWithMonth : null,
    });
  }
  return yAxisValues;
};
