# 编译阶段
FROM node:18-alpine AS base

FROM base AS build

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set registry 'https://registry.npmmirror.com/'
RUN yarn install

FROM base AS builder

RUN apk update && apk add --no-cache git

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .

RUN yarn build


# 运行阶段
FROM base AS runner
ENV TZ="Asia/Shanghai"
WORKDIR /app

# 从编译阶段复制构建好的文件，而不包含开发依赖

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=build /app/node_modules ./node_modules
COPY package.json yarn.lock ./

EXPOSE 3200

CMD ["yarn", "run", "start"]

