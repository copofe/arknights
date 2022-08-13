import dayjs from "dayjs";
import { defineStore, PiniaPluginContext, StateTree } from "pinia";
import { mergeWith } from "ramda";
import { offsetStartTime, offsetEndTime } from "::/utils";
import dayEvents from "::/db/day";
import weekEvents from "::/db/week";
import monthEvents from "::/db/month";

function mergeResource(u: Resources, n: Resources) {
  return mergeWith((u1: number, n1: number) => u1 + n1, u, n);
}

export default defineStore("main", {
  state: () => {
    const historyWarehouse = JSON.parse(localStorage.getItem('warehouse') || '{}');
    return {
      warehouse: historyWarehouse.value || {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      },
      resources: {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      },
      start: offsetStartTime(dayjs()),
      end: offsetEndTime(dayjs('2022-10-31')),
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
    addResource(resource: Resource, num: number) {
      this.resources[resource] += num;
    },
    setEndTime(time: number) {
      this.end = dayjs(time);
    },
    // 计算周期性获得的资源
    calcTimeResources(unit: 'day' | 'week' | 'month', events: EventItem[]) {
      const diff = this.end.diff(this.start, unit);
      const len = unit === 'day' ? diff : diff + 1;
      const r = {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      };
      for (let index = 0; index < len; index++) {
        events.forEach((e) => {
          const { originiuns = 0, orundums = 0, headhunting = 0 } = typeof e.getter === 'object' ? e.getter : e.getter(this.start, this.end);
          r.originiuns += originiuns;
          r.orundums += orundums;
          r.headhunting += headhunting;
        });
      }
      console.log(len, unit, r);
      this.resources = mergeResource(this.resources, r);
    },
    init() {
      this.calcTimeResources('day', dayEvents);
      this.calcTimeResources('week', weekEvents);
      this.calcTimeResources('month', monthEvents);
    },
  },
});

export const subscribe = (context: PiniaPluginContext) => {
  context.store.$subscribe((mutation, state) => {
    localStorage.setItem('warehouse', JSON.stringify({
      time: state.start,
      value: state.warehouse,
    }));
  });
};
