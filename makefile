.PHONY: start stop restart install development lint clean

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install: start
	docker-compose exec node npm install

development: start install
	docker-compose exec node npm run development

lint: start install
	docker-compose exec node npm run lint

clean: start
	docker-compose exec node npm run clean
