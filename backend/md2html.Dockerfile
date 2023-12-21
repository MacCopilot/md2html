# Build stage
FROM golang:1.19.3-alpine3.16 AS builder
WORKDIR /app
COPY md2html .
RUN apk add build-base \
  && go build -o ./main ./cmd/server/main.go

# Run stage
FROM alpine:3.16
WORKDIR /app
COPY --from=builder /app/main .

COPY md2html/icons /app/icons
COPY md2html/app.env .
COPY md2html/start.sh .
COPY md2html/wait-for.sh .
EXPOSE 8080
CMD [ "/app/main" ]
ENTRYPOINT [ "/app/start.sh" ]