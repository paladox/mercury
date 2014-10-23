interface CacheInterface {
	engine: any;
	name: string;
	location?: any;
	shared?: boolean;
}

interface LoggerInterface {
	[key: string]: string
}

interface GAAccount {
	// namespace prefix for _gaq.push methods, ie. 'special'
	prefix?: string;
	// ie. 'UA-32129070-1'
	id: string;
	// sampling percentage, from 1 to 100
	sampleRate: number;
}

interface GAAccountMap {
	[name: string]: GAAccount;
}

interface LocalSettings {
	apiBase: string;
	backendRequestTimeout: number;
	cache: CacheInterface;
	environment: any;
	host: any;
	loggers: LoggerInterface;
	mediawikiHost: string;
	maxRequestsPerChild: number;
	newRelic: boolean;
	port: number;
	proxyMaxRedirects: number;
	tracking: {
		ga: GAAccountMap;
		quantserve: string;
		comscore: {
			keyword: string;
			id: string;
			c7: string;
			c7Value: string;
		}
	};
	wikiFallback: string;
	workerCount: number;
	workerDisconnectTimeout: number;
}
