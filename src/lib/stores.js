import { writable } from 'svelte/store';

const devices = writable([]);
const consoleMessages = writable([]);
export { devices, consoleMessages };
