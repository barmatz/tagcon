import { create } from 'axios';

const { REACT_APP_API_PORT } = process.env
		, { get } = create({
			baseURL: `http://localhost:${REACT_APP_API_PORT}/api`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		, fetch = url => get(url).then(({ data }) => data)

export const fetchPlaylist = () => fetch('/playlist');

export const fetchVideo = id => fetch(`/video/${id}`);
