import { useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import { AuthContext} from '../providers';
import { login as userLogin, postSurveyData} from '../api';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwtDecode(userToken);
       
        setUser({...user});
      }

      setLoading(false);
    };

    getUser();
  }, []);


  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const submitSurveyData = async (name , gender, nationality, email, phoneNumber, address) => {
    const response = await postSurveyData(name , gender, nationality, email, phoneNumber, address);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  
  
  return {
    user,
    login,
    loading,
    submitSurveyData
  };
};