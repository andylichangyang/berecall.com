// D:/berecall/script.js (修改后的版本)

const promptInput = document.getElementById('promptInput');
const generateButton = document.getElementById('generateButton');
const resultArea = document.getElementById('resultArea');

generateButton.addEventListener('click', async () => { // 注意这里加了 async
  const userPrompt = promptInput.value.trim();

  if (userPrompt === '') {
    alert('请输入一些图片描述！');
    return;
  }

  // 更新 UI，显示加载状态
  resultArea.innerHTML = '正在发送请求到后端...';
  generateButton.disabled = true; // 禁用按钮防止重复点击

  try {
    // 使用 fetch 调用我们的后端函数 /generate-image
    // 注意 URL 是相对路径 '/generate-image'
    const response = await fetch('/generate-image', {
      method: 'POST', // 必须是 POST，因为后端函数是 onRequestPost
      headers: {
        'Content-Type': 'application/json', // 告诉后端我们发送的是 JSON
      },
      body: JSON.stringify({ prompt: userPrompt }), // 把提示词包装成 JSON 发送
    });

    // 解析后端返回的 JSON 数据
    const result = await response.json();

    if (!response.ok) {
      // 如果后端返回了错误状态码 (4xx, 5xx)
      throw new Error(`后端错误: ${result.error || response.statusText}`);
    }

    // 在浏览器控制台打印后端返回的结果 (现在只是占位符)
    console.log('后端返回:', result);

    // 更新 UI 显示后端的消息 (暂时)
    resultArea.innerHTML = `后端说: ${result.message || JSON.stringify(result)}`;

  } catch (error) {
    // 处理 fetch 或后端逻辑中可能发生的错误
    console.error('调用后端函数时出错:', error);
    resultArea.innerHTML = `请求失败: ${error.message}`;
  } finally {
     // 无论成功或失败，最后都重新启用按钮
     generateButton.disabled = false;
  }
});