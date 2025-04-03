import { Subject, interval } from 'rxjs';
import { tap, multicast, refCount, share } from 'rxjs/operators';

/*
 * The multicast operator will subscribe the Subject you return
 * to the underlying observable when connect() is called.
 * This can be any flavor of Subject, for instance you can also
 * multicast with a Behavior or ReplaySubject instead should
 * the need arise.
 */
/*
 * Multicast returns a 'ConnectableObservable', meaning you need
 * to call the connect method to tell it when to subscribe the 
 * subject to the source. Without calling connect no values will be
 * emitted. connect() returns a subscription you can use to then
 * unsubscribe when needed.
 */

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete'),
};

const interval$ = interval(2000).pipe(
    tap(i => console.log('new interval', i)),
);

const multicastedInterval$ = interval$.pipe(
    multicast(() => new Subject()),
);

const connectedSub = multicastedInterval$.connect();

multicastedInterval$.subscribe(observer);
multicastedInterval$.subscribe(observer);

// Unsubscribe after 3 seconds
setTimeout(() => connectedSub.unsubscribe(), 3000);
