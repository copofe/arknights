import { Dayjs } from 'dayjs';

declare global {
  interface Resources {
    originiuns?: number;
    orundums?: number;
    headhunting?: number;
  }
  interface Settings {
    annihilationReward: number;
    currentWeekAnnihilation: number;
    currentWeekTaskCompleted: boolean;
    // 今日任务100玉是否领取
    todayTaskCompleted: boolean;
  }
  type Resource = 'originiuns' | 'orundums' | 'headhunting';
  type ResourceGetter = Resources | ((start: Dayjs, end: Dayjs, settings: Settings) => Resources);

  interface DayItem {
    name: string;
    extra?: string;
    getter: ResourceGetter;
  }

  interface WeekItem {
    name: string;
    extra?: string;
    getter: ResourceGetter;
  }

  interface MonthItem {
    name: string;
    extra?: string;
    getter: ResourceGetter;
  }

  type EventItem = DayItem | WeekItem | MonthItem;

  interface ActivityItem {
    name: string;
    extra?: string;
    date: [number, number];
    getter: ResourceGetter;
  }

  type UpdateType = '闪断更新' | '版本更新'
  interface UpdateItem {
    name: UpdateType;
    extra?: string;
    date: [number, number];
    getter: ResourceGetter;
  }
}
