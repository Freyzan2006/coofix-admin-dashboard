
check: 
	bun run check

format:
	bun run format

lint:
	bun run lint

build:
	bun run build

clear:
	bun run knip

test: check format lint build clear

