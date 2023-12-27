import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { Loader } from '../Components';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { GET_SURVEY_FORM_URL } from '../utils/constants';

const SurveyInfo = () => {
  const [surveyInfo, setSurveyInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { userId } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(GET_SURVEY_FORM_URL);
      const data = await response.json();
      console.log('response', data);

      setSurveyInfo(data);
      setLoading(false);
    };

    getUser();
  }, [userId, navigate , addToast]);

  if (auth.loading) {
    return <Loader />;
  }

  console.log('elon bhai', surveyInfo);

  return (
    <div className={styles.settings}>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{surveyInfo[0].email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name:</div>
        <div className={styles.fieldValue}>{surveyInfo[0].name}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Gneder:</div>
        <div className={styles.fieldValue}>{surveyInfo[0].gender}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Nationality:</div>
        <div className={styles.fieldValue}>{surveyInfo[0].nationality}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Phone Number:</div>
        <div className={styles.fieldValue}>{surveyInfo[0].phoneNumber}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Address:</div>
        <div className={styles.fieldValue}>{surveyInfo[0].address}</div>
      </div>

    </div>
  );
};

export default SurveyInfo;