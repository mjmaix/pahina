import EventEmitter from 'events';
import ProgressBar from 'progress';

type Bars = { [name: string]: ProgressBar };
const progressBars: Bars = {};

class MainEmitter extends EventEmitter {}

const ProgressEventEmitter = new MainEmitter();
ProgressEventEmitter.on('progress', (name, data) => {
  progressBars[name].tick();
});

export const initProgressBar = (
  name: string,
  length: number,
  obj: object = {},
) => {
  const message = `${name} :percent :current/:total [Elapsed :elapsed] [ETAs :etas]`;
  progressBars[name] = new ProgressBar(message, {
    total: length,
    ...obj,
  });
};

export const emitter = (event: string, name: string, obj: any) =>
  ProgressEventEmitter.emit(event, name, obj);

export default progressBars;
