import path from 'path';

export const AUTH_STATE_DIR = path.resolve(process.cwd(), '.playwright', 'auth');
export const AUTH_STATE_PATH = path.join(AUTH_STATE_DIR, 'demoapps-storage-state.json');

