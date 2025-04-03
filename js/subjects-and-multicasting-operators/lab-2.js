import { ObservableStore } from './store.js';

const initialState = {
    user: 'Brian',
    isAuthenticated: true,
}

const store = new ObservableStore(initialState);

/*
 * Select a slice of state from store.
 */
store.selectState('user').subscribe(console.log);

/*
 * Update a property with new value.
 */
store.updateState({ user: 'Joe' });

/*
 * Selected state above (user) only emits when value has changed
 * for the requested property.
 */
store.updateState({ isAuthenticated: true });
store.updateState({ isAuthenticated: false });
