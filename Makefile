#############################
# Application Teritory
#############################
dev:
	npm run dev
prod:
	npm start
build:
	npm run build

install: npm.o build.o seed.o

npm.o:
	npm ci

build.o:
	npm run build

seed.o:
	npx knex --cwd src --knexfile knexfile seed:run

#############################
# Knex Database Teritory
#############################
kmake:
ifdef name
	npx knex --cwd src --knexfile knexfile migrate:make ${name}
endif

kmakes:
ifdef name
	npx knex --cwd src --knexfile knexfile seed:make ${name}
endif

kmig:
ifdef type
	npx knex --cwd src --knexfile knexfile migrate:${type}
endif

krun:
	npx knex --cwd src --knexfile knexfile seed:run

klist:
	npx knex --cwd src --knexfile knexfile migrate:list