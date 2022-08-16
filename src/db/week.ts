import dayjs from 'dayjs';

const weeks: WeekItem[] = [
  {
    name: '每周任务',
    getter(start, end, settings) {
      const res = {
        orundums: 0,
      };
      const weeklyTaskOrundums = 500;
      if (start.isSame(dayjs(), 'week')) {
        if (!settings.currentWeekTaskCompleted) {
          res.orundums += weeklyTaskOrundums;
        }
      } else {
        res.orundums += weeklyTaskOrundums;
      }
      if (res.orundums > 0) {
        console.warn(
          // eslint-disable-next-line vue/max-len
          `${start.startOf('week').format('YYYY-MM-DD')}~${start.endOf('week').format('YYYY-MM-DD')}`,
          this.extra,
        );
      }
      return res;
    },
    extra: '每周任务可获得合成玉 × 500',
  },
  {
    name: '剿灭',
    getter(start, end, settings) {
      const res = {
        orundums: 0,
      };
      if (start.isSame(dayjs(), 'week')) {
        if (settings.currentWeekAnnihilation > 0) {
          res.orundums += settings.currentWeekAnnihilation;
        }
      } else {
        res.orundums += settings.annihilationReward;
      }
      if (res.orundums > 0) {
        console.warn(
          // eslint-disable-next-line vue/max-len
          `${start.startOf('week').format('YYYY-MM-DD')}~${start.endOf('week').format('YYYY-MM-DD')}`,
          this.extra,
        );
      }
      return res;
    },
    extra: '每周剿灭可获得合成玉 × 1800',
  },
];

export default weeks;
