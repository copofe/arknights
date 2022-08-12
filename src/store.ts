import dayjs from "dayjs";
import { defineStore } from "pinia";
import { mergeWith } from "ramda";
import { offsetStartTime, offsetEndTime } from "::/utils";
import dayEvents from "::/db/day";
import weekEvents from "::/db/week";
import monthEvents from "::/db/month";

type Resource = "originiuns" | "orundums" | "headhunting";

function mergeResource(u: Resources, n: Resources) {
  return mergeWith((u1: number, n1: number) => u1 + n1, u, n);
}

export default defineStore("main", {
  state: () => {
    return {
      warehouse: {
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
      end: offsetEndTime(dayjs().add(1, "month")),
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
    addWarehouseResource(resource: Resource, num: number) {
      this.warehouse[resource] += num;
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
      const r = {
        originiuns: 0,
        orundums: 0,
        headhunting: 0,
      };
      for (let index = 0; index < diff; index++) {
        events.forEach((e) => {
          const { originiuns = 0, orundums = 0, headhunting = 0 } = e.getter as Resources;
          r.originiuns += originiuns;
          r.orundums += orundums;
          r.headhunting += headhunting;
        });
      }
      console.log(diff, unit, r);
      this.resources = mergeResource(this.resources, r);
    },
    init() {
      this.calcTimeResources('day', dayEvents);
      this.calcTimeResources('week', weekEvents);
      this.calcTimeResources('month', monthEvents);
    },
  },
});
