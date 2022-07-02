import { api } from '../libs/api.js';

async function getClanByTag(tag) {
  try {
    const { data } = await api.get(`/clans/${tag}`);
    return data;
  } catch (error) {
    return error;
  }
}

export { getClanByTag };
