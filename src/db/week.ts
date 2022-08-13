import dayjs from 'dayjs';

const weeks: WeekItem[] = [
  {
    name: '每周任务',
    getter(start) {
      const res = {
        orundums: 0,
      };
      if (start.isSame(dayjs(), 'week')) {
        //
      } else {
        res.orundums = 500;
        console.warn(
          // eslint-disable-next-line vue/max-len
          `${start.startOf('week').format('YYYY-MM-DD')}~${start.endOf('week').format('YYYY-MM-DD')}`,
          this.extra,
        );
      }
      return res;
    },
    extra: '每周任务可获得合成玉×500',
  },
  {
    name: '剿灭',
    getter(start) {
      const res = {
        orundums: 0,
      };
      if (start.isSame(dayjs(), 'week')) {
        //
      } else {
        res.orundums = 1800;
        console.warn(
          // eslint-disable-next-line vue/max-len
          `${start.startOf('week').format('YYYY-MM-DD')}~${start.endOf('week').format('YYYY-MM-DD')}`,
          this.extra,
        );
      }
      return res;
    },
    extra: '每周剿灭可获得合成玉×1800',
  },
];

export default weeks;
