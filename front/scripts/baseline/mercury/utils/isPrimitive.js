/**
 * @param {*} val
 * @returns {boolean} isPrimitive
 */
function isPrimitive(val) {
	const typeOf = typeof val;

	return (val === null) ||
		(typeOf === 'string') ||
		(typeOf === 'number') ||
		(typeOf === 'boolean') ||
		(typeOf === 'undefined');
}
