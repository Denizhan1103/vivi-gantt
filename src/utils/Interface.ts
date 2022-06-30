export interface Options {
    labelName?: string;
    mode: GanttMode;
    currentTime: Date;
    rowScrollRatio: number;
    perColPiece?: number;
    data: GanttState;
    messages?: Messages;
}

interface Messages {
    noItem?: string;
}

export enum GanttMode {
    month = 'Month',
    day = 'Day'
}

export interface GanttState {
    navbar: GanttNavbar[];
    content: GanttContent[];
}

export interface GanttNavbar {
    id: number;
    name: string;
}

export interface GanttContent {
    id: number,
    referenceId: number;
    name: string;
    bgColor?: string;
    bgClass?: string;
    color?: string;
    colorClass?: string;
    date: { start: string; end: string; };
}

export interface HeaderNodeState {
    mode: GanttMode;
    currentTime: Date;
    labelName?: string;
    rowCount: number;
}

export interface ContentNodeState {
    rowCount: number;
    perColPiece?: number;
    state: GanttState;
}

export interface HeaderNodeState {
    mode: GanttMode;
    currentTime: Date;
    labelName?: string;
    rowCount: number;
}