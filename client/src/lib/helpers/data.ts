import { API_URL } from '@/globals';
import { createHttpHeaders } from '../utils';
import { APIResponse, APIRoute } from '../types/general-types';

type FetchOptions = {
  queries?: Record<string, string>;
  authToken?: string | undefined;
};

// url generator with base url and route and url queries
const createURL = (route: APIRoute, queries: Record<string, string>) => {
  const url = new URL(route, API_URL);
  url.search = new URLSearchParams(queries).toString(); // set url queries
  return url;
};

// general get method for http requests to api
export const httpGet = async <Datatype>(
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
export const httpPost = async <Datatype>(
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
