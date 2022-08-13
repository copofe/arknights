import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { defineStore, PiniaPluginContext } from 'pinia';
import { mergeWith } from 'ramda';
import { offsetStartTime, offsetEndTime } from '::/utils';
import dayEvents from '::/db/day';
import weekEvents from '::/db/week';
import monthEvents from '::/db/month';
import { monthlyCard } from '::/db/paid';

dayjs.extend(weekOfYear);

function mergeResource(u: Resources, n: Resources) {
  return mergeWith((u1: number, n1: number) => u1 + n1, u, n);
}

export default defineStore('main', {
  state: () => {
    const { warehouse, paid, end } = JSON.parse(localStorage.getItem('warehouse') || '{}');
    return {
      warehouse: warehouse || {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      },
      resources: {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      },
      paid: paid || {
        monthlyCard: false,
      },
      start: offsetStartTime(dayjs()),
      end: offsetEndTime(dayjs(end || '2022-10-31')),
    };
  },
  getters: {
    total: (state) => {
      const originiuns = state.warehouse.originiuns + state.resources.originiuns;
      const orundums = state.warehouse.orundums + state.resources.orundums;
      const headhunting = state.warehouse.headhunting + state.resources.headhunting;
      return Math.floor((originiuns * 180 + orundums) / 600) + headhunting;
    },
    originiuns: (state) => state.warehouse.originiuns + state.resources.originiuns,
    orundums: (state) => state.warehouse.orundums + state.resources.orundums,
    headhunting: (state) => state.warehouse.headhunting + state.resources.headhunting,
  },
  actions: {
    setWarehouseResource(resource: Resource, num: number) {
      this.warehouse[resource] = num;
    },
    setEndTime(time: number) {
      this.end = offsetEndTime(dayjs(time));
      this.init();
    },
    setMonthlyCard(isPaid: boolean) {
      this.paid.monthlyCard = isPaid;
      this.init();
    },
    // 计算周期性获得的资源
    calcTimeResources(unit: 'day' | 'week' | 'month', events: EventItem[]) {
      const { start, end } = this;
      let diff = 0;
      if (unit === 'week') {
        diff = end.week() - start.week();
      } else if (unit === 'month') {
        diff = end.month() - start.month();
      } else {
        diff = end.diff(start, unit);
      }
      const r = {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      };
      for (let index = 0; index < diff; index += 1) {
        events.forEach((e) => {
          const { originiuns = 0, orundums = 0, headhunting = 0 } = typeof e.getter === 'object'
            ? e.getter
            : e.getter(this.start, this.end);
          r.originiuns += originiuns;
          r.orundums += orundums;
          r.headhunting += headhunting;
          console.info(e.extra);
        });
      }
      this.resources = mergeResource(this.resources, r);
    },
    init() {
      this.resources = {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      };
      this.calcTimeResources(
        'day',
        this.paid.monthlyCard ? [...dayEvents, monthlyCard] : dayEvents,
      );
      this.calcTimeResources('week', weekEvents);
      this.calcTimeResources('month', monthEvents);
    },
  },
});

export const subscribe = (context: PiniaPluginContext) => {
  context.store.$subscribe((mutation, state) => {
    localStorage.setItem('warehouse', JSON.stringify({
      start: state.start,
      end: state.end,
      warehouse: state.warehouse,
      paid: state.paid,
    }));
  });
};
