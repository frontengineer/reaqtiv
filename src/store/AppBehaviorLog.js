import Rx from 'rx-lite';

/*
- Command fired on stream
- A Single-HandlerBlah on stream hears that Command
- HandlerBlah gathers/applies previous events to AggBlah for curr state...not including Command/Change
- AggBlah builds up event or events needed for change...
- AggBlah then applies changes to itself
- HandlerBlah request the uncommitted events(msgs)
- HandlerBlah then request changes to be committed/persisted via ServiceBlah
- ServiceBlah first resolves/throw conflicts...then persists
- ServiceBlah (maybe HandlerBlah) can then publish Events to stream
- Any Denormalizer on stream can hear Event and build its own specialized view (DTO)
- Any Denormalizer will persists its DTO...which is then used
*/


const AppBehavior = new Rx.BehaviorSubject();
AppBehavior.subscribe((x) => {
  console.log('AppBehavior State', x);
});

const AppBehaviorLog = new Rx.BehaviorSubject();
// AppBehaviorLog.scan((acc, op) => {
//   return op(acc);
// }).subscribe(AppBehavior);
//
// AppBehaviorLog.onNext((y) => {
//   return y.map((z) => z + ' item');
// });



module.exports = AppBehaviorLog;
