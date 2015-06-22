export default function isPrimitive (val) {
	var typeOf = typeof val;

	return (val === null) ||
		(typeOf === 'string') ||
		(typeOf === 'number') ||
		(typeOf === 'boolean') ||
		(typeOf === 'undefined');
}
