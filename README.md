# Deploy
Deploy frontend and backend in `docker-compose`

## Requirement
- `Docker`
- `docker-compose`
- any environment :D

## Configuration of backend
```
DATABASE_URL="<your_db_url>"
FRONTEND_URL="<your_frontend_url>"
NODE_ENV="development"
TOKEN="<secret_token>"
MAX_UPLOAD_IMAGE=10
IMAGE_HOST="<your_image_host_url>"
```

## Procedure

```bash
$ docker-compose up --build -d
```

## Notes
* Start up admin account will be 
    - username: admin
    - password: z0U6aFWoKw8Q
