import Api from './api/Api.js';
import './webComponents/index.js';
declare global {
    interface Document {
        api: Api;
    }
}
