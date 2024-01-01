# MarkRepoLite

> **Mrakdown Repo Host List** 有组织的渲染markdown仓库成优美的网页

功能：给定一个markdonw repo 路径，给定一个渲染结果输出路径，然后后端将渲染html结果存到渲染路径，并开启server，前端输出html repo
# 如何使用

### A.Dev Mode

#### 后端
依赖：golang
路径修改wiki_backend/app.env
```shell
cd wiki_backend
go mod tidy
make server
```

#### 前端
依赖：nodejs
```shell
cd wiki_frontend
npm install
npm run dev
```

#### B.Prod Mode
依赖：docker&docker compose
backend路径修改dev-docker-compose.yaml 中volumes
```shell
make build_backend
make build_frontend
make run_compose
```