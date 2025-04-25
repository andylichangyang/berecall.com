// functions/generate-image.js

export async function onRequestPost(context) {
  try {
    // 1. 从请求中获取 prompt
    const { prompt } = await context.request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'No prompt provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. 访问 AI Binding (必须确保你的 Cloudflare 账户已启用 Workers AI)
    // 通常 Cloudflare 会自动将 AI Binding 注入到 env 对象中
    const ai = context.env.AI;
    if (!ai) {
         // 如果 AI binding 不存在，返回错误
         console.error('AI binding is not available in context.env.AI');
         return new Response(JSON.stringify({ error: 'AI binding not configured or Workers AI not enabled.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 3. 选择 AI 模型并准备输入
    //    你需要根据 Cloudflare Workers AI 文档选择一个可用的文生图模型
    //    以下是一些例子 (请查阅 Cloudflare 最新文档确认模型名称):
    // const model = '@cf/stabilityai/stable-diffusion-xl-base-1.0'; // 质量较好，可能稍慢
    const model = '@cf/bytedance/stable-diffusion-xl-lightning'; // 速度较快
    // const model = '@cf/lykon/dreamshaper-8-lcm'; // 另一个 Lcm 加速模型
    // const model = '@cf/runwayml/stable-diffusion-v1-5-inpainting'; // 注意这个是 inpainting 模型

    // 我们选用一个较快的模型作为示例
    const currentModel = '@cf/bytedance/stable-diffusion-xl-lightning';
    const inputs = { prompt: prompt };

    console.log(`Backend: Calling AI model (<span class="math-inline">\{currentModel\}\) with prompt\: "</span>{prompt}"`);

    // 4. 调用 AI 模型运行
    //    Workers AI 的 run 方法返回的是原始响应体，对于图片通常是 ArrayBuffer 或类似格式
    const responseBody = await ai.run(currentModel, inputs);

    console.log('Backend: AI model execution finished.');

    // 5. 将 AI 返回的图片数据直接作为响应体返回给前端
    //    需要设置正确的 Content-Type 告诉浏览器这是一个图片
    return new Response(responseBody, {
      headers: {
        // 根据模型实际输出格式设置，通常是 png
        'Content-Type': 'image/png'
      }
    });

  } // functions/generate-image.js (新的 catch 块)
  catch (error) {
      // 仍然尝试在后端日志打印详细信息 (以防万一日志能工作)
      console.error('Error in backend function calling AI:', error);
  
      // 准备包含详细信息的错误消息，包括堆栈跟踪 (如果可用)
      const errorMsg = `Backend Function Error: <span class="math-inline">\{error\.message \|\| 'Unknown error'\}\\nStack Trace\:\\n</span>{error.stack || 'Not available'}`;
  
      // **重要：将错误作为纯文本返回，而不是 JSON**
      return new Response(errorMsg, {
          status: 500, // 保持 500 错误状态
          headers: {
              // **重要：设置 Content-Type 为 text/plain**
              'Content-Type': 'text/plain'
          },
      });
  }
}