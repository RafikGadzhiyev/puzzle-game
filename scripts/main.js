const image = document.querySelector('img');

const IMAGE_WIDTH = image.width;
const IMAGE_HEIGHT = image.height;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = IMAGE_WIDTH;
canvas.height = IMAGE_HEIGHT;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const SPLIT_TIMES = 5;
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
