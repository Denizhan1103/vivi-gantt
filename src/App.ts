import GanntDom from "./Dom.js";
import Resizable from "./Resizable.js";

enum GanntType {
  month = "month",
}

interface Data {
  navbar: { id: number; name: string }[];
  content?: { id: number; referenceId: number; name: string }[];
}

interface Options {
  labelName?: string;
  ganntType?: GanntType;
  itemWidth?: number;
  itemHeight?: number;
  headerHeight?: number;
  labelBgColor?: string;
  navbarBgColor?: string;
  headerBgColor?: string;
  data: Data;
}

export default class GanntChart {
  constructor(target: HTMLElement, Options: Options) {}
}
