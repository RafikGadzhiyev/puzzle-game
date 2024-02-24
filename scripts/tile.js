/**
 * @description returns list of image pieces as raw tile
 *
 * @param image {HTMLImageElement}
 * @param splitTimes {number}
 * @param separatorSize {number}
 * @param pieceSize {Object}
 * @param pieceSize.width {number}
 * @param pieceSize.height {number}
 *
 * @return {*[]}
 */
function getRawTilesData(image, splitTimes, pieceSize, separatorSize) {
	const tilesData = [];

	for (let i = 0; i < splitTimes; ++i) {
		for (let j = 0; j < splitTimes; ++j) {
			tilesData.push(
				{
					image,
					dx: i * pieceSize.width,
					dy: j * pieceSize.height,
					dWidth: pieceSize.width - separatorSize,
					dHeight: pieceSize.height - separatorSize
				}
			)
		}
	}

	return tilesData;
}

/**
 * @description updates raw tiles with image slice data
 *
 * @param ctx {CanvasRenderingContext2D}
 * @param image {HTMLImageElement}
 * @param rawTiles {Array<Object>}
 * @param splitCoords {Object}
 * @param pieceSize {Object}
 * @param options {Object}
 *
 * @param splitCoords.sx {number}
 * @param splitCoords.sy {number}
 *
 * @param pieceSize.width {number}
 * @param pieceSize.height {number}
 *
 * @param options.isUpdateRandomly {boolean}
 * @param options.SPLIT_TIMES {number}
 *
 */
function getTiles(ctx, image, rawTiles, splitCoords, pieceSize, options) {
	const {
		isUpdateRandomly = true,
		SPLIT_TIMES
	} = options
	const updatedTiles = Array(rawTiles.length).fill({})

	let tileCount = 1;

	while (tileCount - 1 !== rawTiles.length ) {
		let randomTileIndex = isUpdateRandomly
			? getRandomNumberUntilSuccess(rawTiles)
			: 0

		let randomTile = rawTiles[randomTileIndex]

		updatedTiles[randomTileIndex] = {
				...randomTile,
				sx: splitCoords.sx,
				sy: splitCoords.sy,
				sWidth: pieceSize.width,
				sHeight: pieceSize.height,
				rIndex: randomTileIndex
			}

		splitCoords.sx += pieceSize.width

		if (tileCount && tileCount % SPLIT_TIMES === 0) {
			splitCoords.sy += pieceSize.height
			splitCoords.sx = 0
		}

		tileCount++;
		rawTiles[randomTileIndex] = null
	}

	return updatedTiles
}

function getRandomNumberUntilSuccess(array) {
	let randomIndex;

	while(
		randomIndex === undefined
		|| !array[randomIndex]
	) {
		randomIndex = Math.floor(Math.random() * array.length)
	}

	return randomIndex
}
