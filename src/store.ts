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
    const {
      warehouse, paid, operations, end, settings,
    } = JSON.parse(localStorage.getItem('warehouse') || '{}');
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
      operations: operations || {
        paradoxSimulation: 0,
      },
      start: offsetStartTime(dayjs()),
      end: offsetEndTime(dayjs(end || '2022-10-31')),
      settings: settings || {
        annihilationReward: 1800,
        currentWeekAnnihilation: 0,
        currentWeekTaskOrundums: false,
      },
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
    updateSettings<T extends keyof Settings>(key: T, val: Settings[T]) {
      this.settings[key] = val;
      this.init();
    },
    // 计算周期性获得的资源
    calcTimeResources(unit: 'day' | 'week' | 'month', events: EventItem[]) {
      const { start, end } = this;
      const diff = end.endOf(unit).diff(start.endOf(unit), unit);
      const r = {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      };
      for (let index = 0; index <= diff; index += 1) {
        // eslint-disable-next-line no-loop-func
        events.forEach((e) => {
          const { originiuns = 0, orundums = 0, headhunting = 0 } = typeof e.getter === 'object'
            ? e.getter
            : e.getter(start.add(index, unit), end, this.settings);
          r.originiuns += originiuns;
          r.orundums += orundums;
          r.headhunting += headhunting;
        });
      }
      this.resources = mergeResource(this.resources, r);
    },
    // 悖论模拟
    setParadoxSimulation(n: number) {
      this.operations.paradoxSimulation = n;
      this.init();
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
      this.resources = mergeResource(this.resources, {
        orundums: 200 * this.operations.paradoxSimulation,
      });
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
      operations: state.operations,
      settings: state.settings,
    }));
  });
};
