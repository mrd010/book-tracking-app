import { API_URL } from '@/globals';
import { createHttpHeaders } from '../utils';
import { APIResponse, APIRoute } from '../types/general-types';

type FetchOptions = {
  queries?: Record<string, string>;
  authToken?: string | undefined;
};

// url generator with base url and route and url queries
const createURL = (route: APIRoute | string, queries: Record<string, string>, baseURL?: string) => {
  const url = new URL(route, baseURL || API_URL);
  url.search = new URLSearchParams(queries).toString(); // set url queries
  return url;
};

// general get method for http requests to api
export const serverApiGet = async <Datatype>(
  route: APIRoute, // api route to send request
  { queries = {}, authToken }: FetchOptions = { queries: {} },
): Promise<APIResponse<Datatype>> => {
  const url = createURL(route, queries); // generate url
  const headers = createHttpHeaders(authToken); // create http headers object

  try {
    const resJSON: APIResponse<Datatype> = await fetch(url, {
      method: 'GET',
      headers,
      mode: 'cors',
    }).then((res) => res.json());
    return resJSON;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
};

// general post method for http requests to api
export const serverApiPost = async <Datatype>(
  route: APIRoute,
  body: Record<string, unknown>, // body to post
  { queries = {}, authToken }: FetchOptions = { queries: {} },
): Promise<APIResponse<Datatype>> => {
  const url = createURL(route, queries); // generate url
  const headers = createHttpHeaders(authToken); // create http headers object

  try {
    const resJSON: APIResponse<Datatype> = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      mode: 'cors',
    }).then((res) => res.json());

    return resJSON;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
};

// getter for openlibrary api
export const oplApiGet = async <Datatype>(
  route: string,
  queries: Record<string, string>,
): Promise<Datatype> => {
  const url = createURL(`/ol${route}`, queries); // generate url
  const headers = createHttpHeaders(); // create http headers object

  try {
    const response = await fetch(`${url.pathname}${url.search}`, {
      method: 'GET',
      headers,
      mode: 'cors',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
};
