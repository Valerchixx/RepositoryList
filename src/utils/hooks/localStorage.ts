export function getFavoriteItem(name: string) {
	const value = sessionStorage.getItem(name);
	let array;
	if (value === null) {
		array = [];
	} else {
		array = JSON.parse(sessionStorage.getItem(name) || '');
	}

	return array;
}
