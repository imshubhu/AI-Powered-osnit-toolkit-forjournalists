import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ai-powered-osnit-toolkit-for-journalist.onrender.com/api',
});

export const searchNews = async (query: string) => {
  const res = await API.post('/search', { query });
  return res.data.results;
};

export const searchReddit = async (query: string) => {
  const res = await API.post('/search/reddit', { query });
  return res.data.data;
};

export const summarizeNews = async (urls: string[]) => {
  const res = await API.post('/summarize', { urls });
  return res.data.summary;
};

export const entitiesNews = async (text: string[]) => {
  const res = await API.post('/entities', { text });
  return res.data;
};

export const analyzeFakeNews = async (text: string) => {
  const res = await API.post('/analyze', { text });
  return res.data;
};

export const analyzeFakeImage = async (image: File) => {
  const form = new FormData();
  form.append('image', image)
  const res = await API.post('/analyze/fakeImage', form);
  return res.data;
};

export const searchEntities = async (name: string, context: string | null) => {
  const res = await API.post('/entities/search', { name, context });
  return res.data;
};

export const analyzeDocumentIntelligence = async (document: File) => {
  const form = new FormData();
  form.append('document', document)
  const res = await API.post('/documents/analyze', form);
  return res.data;

};
