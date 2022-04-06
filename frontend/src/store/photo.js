import { csrfFetch } from "./csrf"

const ADD = 'photo/ADD'
const DELETE = 'photo/DELETE'
const EDIT = 'photo/EDIT'
const LOAD = 'photos/LOAD'
const LOAD_ONE = '/photos/LOAD_ONE'


const addPhoto = (photo) => ({
    type: ADD,
    photo: photo.photo
})

const removePhoto = (id) => ({
    type: DELETE,
    id
})

const updatePhoto = photo => ({
    type: EDIT,
    photo: photo.photo
})

const loadPhoto = (photo) => {
    return {
        type: LOAD_ONE,
        photo: photo.photo
    }
}

const loadPhotos = (photoList) => {
    const { photos } = photoList
    return {
        type: LOAD,
        photos
    }
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

export const editPhoto = (photo) => async (dispatch) => {
    const { id, content } = photo
    const res = await csrfFetch(`/api/photos/${id}/edit`, {
        method: 'PUT',
        body: JSON.stringify({ content })
    })
    const editedPhoto = await res.json()
    dispatch(updatePhoto(editedPhoto))
}

export const getPhoto = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos/${id}`)
    const photo = await res.json()
    dispatch(loadPhoto(photo))
}

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


const initializedState = {};

export default function photoReducer(state = initializedState, action) {
    let newState;
    switch (action.type) {
        case LOAD_ONE:
            newState = { ...state }
            newState[action.photo.id] = action.photo
            return newState
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
        case EDIT:
            newState = { ...state }
            newState[action.photo.id] = action.photo
            return newState
        default:
            return state
    }
}