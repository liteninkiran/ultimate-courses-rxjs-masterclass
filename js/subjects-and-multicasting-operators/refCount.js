import { Subject, interval } from 'rxjs';
import { tap, multicast, refCount, share } from 'rxjs/operators';

/*
 * Instead of explicitly calling connect(), you can instead use the
 * refCount operator. refCount will automatically connect the Subject
 * to the source for you when the first subscriber arrives, and disconnect
 * when the subscriber count hits zero.
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
    refCount(),
);

const subOne = multicastedInterval$.subscribe(observer);
const subTwo = multicastedInterval$.subscribe(observer);

// Unsubscribe after 3 seconds
setTimeout(() => {
    subOne.unsubscribe();
    subTwo.unsubscribe();
}, 3000);

