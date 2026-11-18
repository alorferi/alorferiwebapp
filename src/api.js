import axios, { isCancel } from 'axios';
const api=axios.create();
api.isCancel=isCancel;
export default api;
