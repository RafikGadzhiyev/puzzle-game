const image = document.querySelector('img');

const IMAGE_WIDTH = image.width;
const IMAGE_HEIGHT = image.height;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = IMAGE_WIDTH;
canvas.height = IMAGE_HEIGHT;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const SPLIT_TIMES = 4;
const SPLIT_SEPARATOR_SIZE = 1;

const PIECE_WIDTH = Math.round(CANVAS_WIDTH / SPLIT_TIMES);
const PIECE_HEIGHT = Math.round(CANVAS_HEIGHT / SPLIT_TIMES)

let splitCoords = {
	sx: 0,
	sy: 0,
}

const rawTilesData = getRawTilesData(
	image,
	SPLIT_TIMES,
	{
		width: PIECE_WIDTH,
		height: PIECE_HEIGHT
	},
	SPLIT_SEPARATOR_SIZE
);
const tiles = getTiles(
	ctx,
	image,
	rawTilesData,
	splitCoords,
	{
		width: PIECE_WIDTH,
		height: PIECE_HEIGHT
	},
	{
		SPLIT_TIMES,
	}
)

let selectedTile = null;

console.log(rawTilesData, tiles)

function draw () {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	for (const tile of tiles) {
		const {
			sx,
			sy,
			dx,
			dy,
			dWidth,
			dHeight
		} = tile

		ctx.drawImage(
			image,
			sx,
			sy,
			PIECE_WIDTH,
			PIECE_HEIGHT,
			dx,
			dy,
			dWidth,
			dHeight
		)
	}
}

canvas.onmousedown = e => {
	const x = e.offsetX;
	const y = e.offsetY;

	const xi = Math.floor(x / PIECE_WIDTH)
	const yi = Math.floor(y / PIECE_HEIGHT)

	const tileIndex = xi * SPLIT_TIMES + yi ;

	if (
		!selectedTile
	) {
		selectedTile = {
			index: tileIndex,
			tile: tiles[tileIndex]
		}
	}
	else if (selectedTile.index === tileIndex) {
		selectedTile = null;
	}
	else {
		console.log(tiles[0].dx)
		const tmp = tiles[selectedTile.index];

		tiles[selectedTile.index] = {
			...tmp,
			sx: tiles[tileIndex].sx,
			sy: tiles[tileIndex].sy,
		}
		tiles[tileIndex] = {
			...tiles[tileIndex],
			sx: tmp.sx,
			sy: tmp.sy
		}

		selectedTile = null;
	}

	draw()
}

draw();
