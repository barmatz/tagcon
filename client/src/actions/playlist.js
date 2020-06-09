export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

export const updatePlaylist = playlist => ({ type: UPDATE_PLAYLIST, playlist })

export const PLAYLIST_ITEM_SELECTED = 'PLAYLIST_ITEM_SELECTED';

export const playlistItemSelected = selectedItem => ({ type: PLAYLIST_ITEM_SELECTED, selectedItem });
