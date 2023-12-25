# MarkRepoLite

> **Mrakdown Repo Host List** 有组织的渲染markdown仓库成优美的网页

# 如何使用

### A.Dev Mode

#### 后端
依赖：golang
```shell
cd wiki_backend
go mod tidy
make server
```

#### 前端
依赖：nodejs
```shell
cd wiki_fronted
npm install
npm run dev
```

#### B.Prod Mode
依赖：docker&docker compose
```shell
make build_backend
make build_fronted
make run_compose
```