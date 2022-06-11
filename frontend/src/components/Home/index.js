import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

import UserHome from './UserHome';
import NonUserHome from './NonUserHome';
// import * as photoActions from '../../store/photo';

import './Home.css';

export default function Home() {
    // const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(state => Object.values(state.photos));

    // useEffect(() => {
    //     dispatch(photoActions.getPhotos())
    // }, [dispatch])

    let homePage;
    if (sessionUser) {
        homePage = (
            <UserHome photos={(photos)} />
        )
    } else {
        homePage = (
            <NonUserHome photos={(photos)} />
        )
    }
    // console.log('photos', photos)
    //already made the query to sort by id descending but it looks like useSelector
    //is sorting the array elements by id 
    //BOTH LIMIT AND ORDER QUERIES WORK
    return (
        <>
            {photos.length > 0 && homePage}
        </>
    )
}