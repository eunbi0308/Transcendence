all : up

up :	
	@docker compose -f ./docker-compose.yml up --build -d
# up : creating and starting containers / --build : building services / -d : daemon
down :
	@docker compose -f ./docker-compose.yml down

stop :
	@docker compose -f ./docker-compose.yml stop

re :
	@docker compose -f ./docker-compose.yml up --build -d

clean: stop down

fclean: clean
		@docker image prune -a -f
		@docker compose -f ./docker-compose.yml down --remove-orphans
		@docker compose -f ./docker-compose.yml down --volumes

re : fclean all

.PHONY: all up down stop re clean fclean