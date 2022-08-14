import dayjs from 'dayjs';

const months: MonthItem[] = [
  {
    name: '凭证换购',
    getter(start) {
      const res = {
        orundums: 0,
        headhunting: 0,
      };
      if (start.isSame(dayjs(), 'month')) {
        //
      } else {
        res.orundums = 600;
        res.headhunting = 4;
        console.warn(start.format('YYYY-MM'), this.extra);
      }
      return res;
    },
    extra: '绿票商店可获得合成玉 × 600，寻访凭证 × 4，',
  },
  {
    name: '每月签到',
    getter(start, end) {
      let headhunting = 0;
      if (start.isSame(dayjs(), 'month')) {
        if (start.date() < 17) {
          headhunting = 1;
        }
      } else if (start.isSame(end, 'month') && end.date() > 17) {
        headhunting = 1;
      } else {
        headhunting = 1;
      }
      if (headhunting > 0) {
        console.warn(start.format('YYYY-MM'), this.extra);
      }
      return {
        headhunting,
      };
    },
    extra: '每月17号签到可获得寻访凭证 × 1',
  },
];

export default months;
