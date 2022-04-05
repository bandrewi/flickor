import { csrfFetch } from "./csrf"

const ADD = 'photo/ADD'
const DELETE = 'photo/DELETE'
const LOAD = 'photos/LOAD'

const addPhoto = (photo) => ({
    type: ADD,
    photo: photo.photo
})

const loadPhotos = (photoList) => {
    const { photos } = photoList
    return {
        type: LOAD,
        photos
    }
}

const removePhoto = (id) => ({
    type: DELETE,
    id
})

export const getPhotos = () => async (dispatch) => {
    const res = await csrfFetch('/api/photos')
    const photos = await res.json()
    dispatch(loadPhotos(photos))
}

export const getUserPhotos = () => async (dispatch) => {
    const res = await csrfFetch('/api/photos/user')
    const photos = await res.json()
    dispatch(loadPhotos(photos))
}

export const uploadPhoto = (photo) => async (dispatch) => {
    const { imageUrl, content } = photo
    const res = await csrfFetch('/api/photos/new', {
        method: 'POST',
        body: JSON.stringify({ imageUrl, content })
    })
    const newPhoto = await res.json()
    dispatch(addPhoto(newPhoto))
}

export const deletePhoto = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos/${id}/delete`, {
        method: 'DELETE'
    })
    dispatch(removePhoto(id))
}

const initializedState = {};

export default function photoReducer(state = initializedState, action) {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = { ...state }
            action.photos.forEach(photo => newState[photo.id] = photo)
            return newState
        case ADD:
            newState = { ...state }
            newState[action.photo.id] = action.photo
            return newState
        case DELETE:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}