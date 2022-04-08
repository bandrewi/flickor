import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import UserHome from './UserHome';
import NonUserHome from './NonUserHome';
import * as photoActions from '../../store/photo';

import './Home.css';

export default function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(state => state.photos);

    useEffect(() => {
        dispatch(photoActions.getPhotos())
    }, [dispatch])

    let homePage;
    if (sessionUser) {
        homePage = (
            <UserHome photos={Object.values(photos)} />
        )
    } else {
        homePage = (
            <NonUserHome photos={Object.values(photos)} />
        )
    }

    return (
        <>
            {Object.values(photos).length > 0 && homePage}
        </>
    )
}