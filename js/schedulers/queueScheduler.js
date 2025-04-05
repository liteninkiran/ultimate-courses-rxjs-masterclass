import { asyncScheduler, asapScheduler, queueScheduler } from 'rxjs';

/*
 * The queueScheduler executes tasks synchronously by default,
 * allowing you to queue tasks inside other tasks.
 */
// asyncScheduler.schedule(() => console.log('asyncScheduler'));
// asapScheduler.schedule(() => console.log('asapScheduler'));
// queueScheduler.schedule(() => console.log('queueScheduler'));
// console.log('synchronous');

/*
 * Scheduling tasks with queue scheduler inside another
 * queue will always execute the outer tasks first.
 */
queueScheduler.schedule(() => {
    console.log('Start first queue');
    queueScheduler.schedule(() => {
        console.log('Start second queue');
        queueScheduler.schedule(() => {
            console.log('Start/end third queue');
        });
        console.log('End second queue');
    });
    console.log('End first queue');
})
