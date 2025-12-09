
format:
	bun run format

lint:
	bun run lint

build:
	bun run build

clear:
	bun run knip

test: format lint build

