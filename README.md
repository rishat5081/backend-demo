# eFuse APIs

Please follow these steps:

1. `git clone`
2. `docker-compose up --build`
3. `docker-compose up`
4. Open the following <a href='http://localhost:5000/docs'> link </a>
5. If the above link is not working, open <a> http://localhost:5000/docs </a>
6. Swagger is served for working of the APIs

### Changes that are made:

1. PUT is created instead of PATCH, because the subset can be two to three attributes of the entity, which is against the JSON apis rule. PATCH is only used for single attribute of the entity
