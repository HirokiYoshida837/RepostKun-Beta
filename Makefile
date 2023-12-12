.PHONY: build.dev
build.dev:
	skaffold build \
	-p develop

.PHONY: build.prod
build.prod:
	skaffold build \
	-p prod

