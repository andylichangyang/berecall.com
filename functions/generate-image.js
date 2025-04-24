// D:/berecall/functions/generate-image.js

/**
 * 处理 POST 请求的函数
 * 当你的前端JS向 /generate-image 发送 POST 请求时，这个函数会被执行
 */
export async function onRequestPost(context) {
    try {
      // 1. 从发送过来的请求中解析出 JSON 数据 (也就是我们前端发送的提示词)
      const requestData = await context.request.json();
      const prompt = requestData.prompt;
  
      // 2. 简单验证一下是否收到了 prompt
      if (!prompt) {
        return new Response(JSON.stringify({ error: 'No prompt provided' }), {
          status: 400, // Bad Request
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      console.log('Backend function received prompt:', prompt); // 在 Cloudflare 后台日志中可以看到
  
      // --- 在这里，下一步我们将加入调用 Workers AI 的代码 ---
      const aiResponsePlaceholder = {
        message: 'AI generation not implemented yet.',
        receivedPrompt: prompt,
        // 稍后这里会包含图片数据或 URL
      };
      // --- ---
  
      // 3. 返回一个成功的响应给前端，暂时只包含收到的提示词
      return new Response(JSON.stringify(aiResponsePlaceholder), {
        status: 200, // OK
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      console.error('Error in backend function:', error);
      // 4. 如果发生任何错误，返回一个服务器错误响应
      return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
        status: 500, // Internal Server Error
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }