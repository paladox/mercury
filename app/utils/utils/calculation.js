/**
 * Calculate container size based on max dimensions and aspect ratio of the content
 *
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @param {number} contentWidth
 * @param {number} contentHeight
 * @return {width, height}
 */
export function containerSize (
	maxWidth,
	maxHeight,
	contentWidth,
	contentHeight
) {
	var targetSize = {
		width: 0,
		height: 0
	};

	if (maxWidth < maxHeight) {
		targetSize.width = maxWidth;
		targetSize.height = Math.min(maxHeight, ~~(maxWidth * contentHeight / contentWidth));
	} else {
		targetSize.width = Math.min(maxWidth, ~~(maxHeight * contentWidth / contentHeight));
		targetSize.height = maxHeight;
	}

	return targetSize;
}
