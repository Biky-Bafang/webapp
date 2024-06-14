import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'nl.hexidev.biky',
  appName: 'Biky',
  webDir: 'dist',
  "server": {
	"url": "http://192.168.178.109:5173",
	"cleartext": true
  }
};

export default config;
