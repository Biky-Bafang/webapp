import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'nl.hexidev.biky',
	appName: 'Biky',
	webDir: 'dist',
	server: {
		url: 'http://192.168.178.109:5173',
		cleartext: true
	},
	plugins: {
		BluetoothLe: {
			displayStrings: {
				scanning: 'Scanning...',
				cancel: 'Cancel',
				availableDevices: 'Available devices',
				noDeviceFound: 'No device found',
			}
		}
	}
};

export default config;
