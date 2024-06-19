import { writable } from 'svelte/store';

const devices = writable([]);
const consoleMessages = writable([]);
const modal = writable(false);
export { devices, consoleMessages, modal };
