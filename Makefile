stylus = ./node_modules/.bin/stylus
nib = ./node_modules/nib/lib/nib

all: assets/main.css

assets/main.css: assets/styl/main.styl
	# $(stylus) assets/styl/main.styl -u $(nib) -o ./assets
	$(stylus) $< -u $(nib) -o ./assets
	# -curl -silent -X POST http://localhost:35729/changed -d '{ "files": "$@" }'
