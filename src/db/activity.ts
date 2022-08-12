import { Dayjs } from 'dayjs';

const avtivitys = [
  {
    name: '多索雷斯假日',
    date: [],
    getter(date: [Dayjs, Dayjs]) {
      console.log(this);
    },
  },
];

export default avtivitys;
