import EventEmitter from "events";
import ProgressBar from "progress";

type Bars = { [name: string]: ProgressBar };
const progressBars: Bars = {};

class MainEmitter extends EventEmitter {}

const ProgressEventEmitter = new MainEmitter();
ProgressEventEmitter.on("progress", (name, data) => {
  progressBars[name].tick();
});

export const initProgressBar = (name: string, length: number) => {
  const message =
    ":bar :current/:total :rate/row per sec, Estimated completion :etas";
  progressBars[name] = new ProgressBar(message, {
    total: length
  });
};

export const emitter = (event: string, name: string, obj: any) =>
  ProgressEventEmitter.emit(event, name, obj);

export default progressBars;
