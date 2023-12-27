import { API_URLS,  GET_SURVEY_FORM_URL, POST_SURVEY_FORM_URL,  LOCALSTORAGE_TOKEN_KEY, getFormBody} from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    // console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};


export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};


export const postSurveyData = (name, email, gender, nationality, phoneNumber, address) => {
  return customFetch(POST_SURVEY_FORM_URL, {
    method: 'POST',
    body: {name, email, gender, nationality, phoneNumber, address},
  });
};