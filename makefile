install:
	# https://reactnative.dev/docs/environment-setup
	npm install -g expo-cli
	expo init AwesomeProject
	cd AwesomeProject
	expo install expo-location
	expo install @gorhom/bottom-sheet@^4
	expo start -c # clear cache
	npm start

run:
	npm start