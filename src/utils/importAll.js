export default function(r) {
	return r.keys().map(key => r(key)['default'])
}
