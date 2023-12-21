# Build stage
FROM golang:1.19.3-alpine3.16 AS builder
WORKDIR /app
COPY backend .
RUN apk add build-base \
  && go build -o ./main ./cmd/server/main.go

# Run stage
FROM alpine:3.16
WORKDIR /app
COPY --from=builder /app/main .

COPY backend/app.env .
COPY backend/start.sh .
EXPOSE 8080
CMD [ "/app/main" ]
ENTRYPOINT [ "/app/start.sh" ]