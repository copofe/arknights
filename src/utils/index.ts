import { Dayjs } from 'dayjs';

/**
 * 偏移开始时间至当日4点
 */
export const offsetStartTime = (day: Dayjs) => {
  return day.startOf('day');
};

/**
 * 偏移结束时间至次日四点
 */
export const offsetEndTime = (day: Dayjs) => {
  return day.endOf('day');
};
