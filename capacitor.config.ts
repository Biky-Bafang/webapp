import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'nl.hexidev.biky',
	appName: 'Biky',
	webDir: 'dist',
	server: {
		url: 'http://192.168.178.202:5173',
		cleartext: true
	},
	plugins: {
		BluetoothLe: {
			displayStrings: {
				scanning: 'Am Scannen...',
				cancel: 'Abbrechen',
				availableDevices: 'Verfügbare Geräte',
				noDeviceFound: 'Kein Gerät gefunden'
			}
		}
	}
};

export default config;
