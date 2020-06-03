export const PLAYLIST_RECEIVED = 'PLAYLIST_RECEIVED';

export const playlistReceived = playlist => ({ type: PLAYLIST_RECEIVED, playlist })

export const PLAYLIST_ITEM_SELECTED = 'PLAYLIST_ITEM_SELECTED';

export const playlistItemSelected = selectedItem => ({ type: PLAYLIST_ITEM_SELECTED, selectedItem });
