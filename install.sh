bun add @prisma/client

bunx prisma init --datasource-provider sqlite

bunx prisma migrate dev --name init
