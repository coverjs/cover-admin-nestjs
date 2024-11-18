import devConfig from './dev.config';
import prodConfig from './prod.config';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
