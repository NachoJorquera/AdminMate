import React, { useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

function Home() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8081')
      .then(res => {
        if(res.data.Status === "Success") {
          setAuth(true)
          setName(res.data.name)
        } else {
          setAuth(false)
        }
      })
      .then(err => console.log(err));
    }, [])

    const handleDelete = () => {
      axios.get('http://localhost:8081/logout')
      .then(res => {
        location.reload(true);
      }).catch(err => console.log(err));
    }

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('i18nextLng', language);
    };

  return (
    <div className='container mt-4'>
      {
        auth ?
        <div>
          <h3>{t('authMessage')} {name}</h3>
          <button className='btn btn-danger' onClick={handleDelete}>{t('logout')}</button>
        </div>
        :
        <div>
          <h3>{t('notAuthMessage')}</h3>
          <h3>{t('loginNow')}</h3>
          <Link to="/login" className='btn btn-primary'>{t('login')}</Link>
        </div>
      }
    </div>
  )
}

export default Home