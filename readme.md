# BeRecall - AI 图片生成器

BeRecall 是一个基于 AI 技术的图片生成网站，使用 Stability AI 的 API 来生成高质量的图片。

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Stability AI API

## 开始使用

1. 克隆项目：
```bash
git clone https://github.com/your-username/berecall.git
cd berecall
```

2. 安装依赖：
```bash
npm install
```

3. 环境配置：
   - 复制 `.env.example` 文件为 `.env.local`
   - 在 [Stability AI](https://stability.ai/) 注册并获取 API 密钥
   - 将 API 密钥填入 `.env.local` 文件

4. 启动开发服务器：
```bash
npm run dev
```

5. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
berecall/
├── src/
│   ├── app/          # Next.js 应用路由
│   ├── components/   # React 组件
│   ├── styles/       # 样式文件
│   └── utils/        # 工具函数
├── public/           # 静态资源
└── package.json      # 项目配置
```

## 功能特性

- AI 图片生成
- 图片展示和分享
- 响应式设计
- 点赞功能

## 开发指南

- 使用 TypeScript 进行开发
- 遵循 ESLint 规则
- 使用 Prettier 进行代码格式化
- 组件采用函数式组件和 Hooks

## 部署

1. 确保所有环境变量都已正确配置
2. 运行构建命令：
```bash
npm run build
```
3. 启动生产服务器：
```bash
npm start
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情 
