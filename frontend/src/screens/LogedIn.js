import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userAction'
import { listPriceMonitors } from '../actions/priceMonitorActions';
import { createMonitoring } from '../actions/monitoringActions';
import PriceMonitorCard from '../components/PriceMonitorCard'
import CreateMonitorModal from '../components/CreateMonitorModal'
import Loader from '../components/Loader'
import Message from '../components/Message'
import './loged-in.css'

const LogedIn = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const navigate = useNavigate()

  const priceMonitorList = useSelector((state) => state.priceMonitorList);
  const { monitors, loading, error } = priceMonitorList;

  const [userFirstName, setUserFirstName] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleMonitorDelete = async () => {
    dispatch(listPriceMonitors());
  };

  const handleMonitorEdit = async () => {
    alert('Monitor editado com sucesso!');
    dispatch(listPriceMonitors());
  };

  const handleCreateMonitor = async (newMonitorData) => {
    dispatch(createMonitoring(newMonitorData));
    alert('Monitor criado com sucesso!');
    dispatch(listPriceMonitors());
  };

  useEffect(() => {
      if (!userLogin.userInfo) {
          navigate('/')
      }
      else {
          const userInfo = userLogin.userInfo;
          setUserFirstName(userInfo.first_name);
      }
      dispatch(listPriceMonitors());
      }, [navigate, userLogin, dispatch]
  )

  const logoutHandler = () => {
      dispatch(logout())
      navigate('/')
  }

  const reloadPage = () => {
    window.location.reload(true);
  };

  const reloadInterval = setInterval(reloadPage, 60000);

  return (
    <div className="container">
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <div className="loged-in-container01">
        <div className="loged-in-container02">
          <Link to="/" className="back-button">
              <i className="fas fa-chevron-left"></i>
          </Link>
        </div>
        <div className="loged-in-container03">
          <div className="loged-in-container04">
            <h1 className="loged-in-text">
              Ola {userFirstName}, esses são seus ativos:
            </h1>
          </div>
          <div className="loged-in-container05">
            <div className="loged-in-container06">
              <div className="loged-in-container07">
                <button type="button" className="button add-button" onClick={() => setShowCreateModal(true)}>
                  <i class="fa-solid fa-plus"></i>
                </button>
                <CreateMonitorModal
                  show={showCreateModal}
                  onHide={() => setShowCreateModal(false)}
                  onCreate={handleCreateMonitor}
                />
              </div>
              <div className="loged-in-container08">
                <ul className="loged-in-monitors list">
                  {monitors.map((monitor) => (
                    <PriceMonitorCard 
                    key={monitor.id} {...monitor}
                    onMonitorDelete={() => handleMonitorDelete(monitor.id)}
                    onMonitorEdit={() => handleMonitorEdit(monitor.id)}
                     />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="loged-in-container09">
          <button type="button" className="logout-button button" onClick={ logoutHandler }>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogedIn
