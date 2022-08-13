import dayjs from 'dayjs';

const months: MonthItem[] = [
  {
    name: '凭证换购',
    getter: {
      orundums: 600,
      headhunting: 4,
    },
    extra: '绿票商店可获得合成玉×600，寻访凭证×4，',
  },
  {
    name: '每月签到',
    getter: (start, end) => {
      let headhunting = 0;
      if (start.isBefore(dayjs(start).date(17)) || end.isAfter(dayjs(end).date(17))) {
        headhunting += 1;
      }
      return {
        headhunting,
      };
    },
    extra: '每月17号签到可获得寻访凭证×1',
  },
];

export default months;
