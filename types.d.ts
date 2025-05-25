// this will make sure the BE and FE will have the same types
type Stats = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type View = 'CPU' | 'RAM' | 'STORAGE';

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';

type EventPayloadMapping = {
  stats: Stats;
  getStaticData: StaticData;
  // changeView: View;
  // sendFrameAction: FrameWindowAction;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    // subscribeStats: (callback: (stats: Stats) => void) => UnsubscribeFunction;
    subscribeStats: (callback: (stats: Stats) => void) => void;
    getStaticData: () => Promise<StaticData>;
    // subscribeChangeView: (callback: (view: View) => void) => UnsubscribeFunction;
    // sendFrameAction: (payload: FrameWindowAction) => void;
  };
}
