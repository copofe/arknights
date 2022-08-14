import dayjs from 'dayjs';

const days: DayItem[] = [
  {
    name: '每日任务',
    getter(start) {
      const res = {
        orundums: 0,
      };
      if (start.isSame(dayjs(), 'day')) {
        //
      } else {
        res.orundums = 100;
        console.warn(start.format('YYYY-MM-DD'), this.extra);
      }
      return res;
    },
    extra: '每日任务可获得合成玉×100',
  },
];

export default days;
