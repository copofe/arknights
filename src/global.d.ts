import { Dayjs } from 'dayjs';

declare global {
  interface Resources {
    originiuns?: number;
    orundums?: number;
    headhunting?: number;
  }
  type Resource = 'originiuns' | 'orundums' | 'headhunting';
  type ResourceGetter = Resources | ((start: Dayjs, end: Dayjs) => Resources);

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
