import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userAction'

const Test = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const navigate = useNavigate()

    const [userFirstName, setUserFirstName] = useState("");

    useEffect(() => {
        if (!userLogin.userInfo) {
            navigate('/')
        }
        else {
            const userInfo = userLogin.userInfo;
            setUserFirstName(userInfo.first_name);
        }
        }, [navigate, userLogin]
    )

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="home-container">
        <h1>Hello {userFirstName}</h1>
        <button onClick={ logoutHandler }>Logout</button>
    </div>
    )
}

export default Test
