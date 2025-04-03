import { Subject, interval } from 'rxjs';
import { tap, multicast, refCount, share } from 'rxjs/operators';

/*
 * We can actually optimize this example even further. Because multicasting
 * with a refCount is so common, RxJS offers an operator that
 * does both of these things for us, the share operator. This let's us replace 
 * multicast and refCount with share for the same behavior.
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
    share(),
);

const subOne = multicastedInterval$.subscribe(observer);
const subTwo = multicastedInterval$.subscribe(observer);

// Unsubscribe after 3 seconds
setTimeout(() => {
    subOne.unsubscribe();
    subTwo.unsubscribe();
}, 3000);
