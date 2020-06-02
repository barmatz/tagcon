export const FETCH_VIDEO_BY_ID = 'FETCH_VIDEO_BY_ID';

export const fetchVideoById = id => ({ type: FETCH_VIDEO_BY_ID, id });

export const FETCH_VIDEO_BY_ID_SUCCESS = 'FETCH_VIDEO_BY_ID_SUCCESS';

export const fetchVideoByIdSuccess = video => ({ type: FETCH_VIDEO_BY_ID_SUCCESS, video });
