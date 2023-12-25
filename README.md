# MarkRepoLite

> **Mrakdown Repo Host List** 有组织的渲染markdown仓库成优美的网页

# 如何使用

### A.Dev Mode

#### 后端
```shell
cd wiki_backend
go mod tidy
make server
```

#### 前端
```shell
cd wiki_fronted
npm install
npm run dev
```

#### B.Prod Mode

```shell
make build_backend
make build_fronted
make run_compose
```