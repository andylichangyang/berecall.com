// D:/berecall/script.js (修改后的版本)

const promptInput = document.getElementById('promptInput');
const generateButton = document.getElementById('generateButton');
const resultArea = document.getElementById('resultArea');

// script.js (修改 try...catch...finally 块内部)

generateButton.addEventListener('click', async () => {
  const userPrompt = promptInput.value.trim();

  if (userPrompt === '') {
    alert('请输入一些图片描述！');
    return;
  }

  // 先清除旧的结果并显示加载状态
  resultArea.innerHTML = '正在调用 AI 生成图片，请耐心等待...';
  generateButton.disabled = true;
  // 清除可能存在的旧图片对象 URL，释放内存
  const existingImg = resultArea.querySelector('img');
  if (existingImg && existingImg.src.startsWith('blob:')) {
     URL.revokeObjectURL(existingImg.src);
  }

  try {
    // 调用后端函数
    const response = await fetch('/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    // script.js (修改 if (!response.ok) 错误处理块)
if (!response.ok) {
  let errorDetail = `Status: ${response.status} ${response.statusText}`; // 默认错误信息
  try {
      // **重要：现在我们优先尝试读取纯文本错误**
      const textError = await response.text();
      // 如果读取到的文本不为空，就用它作为错误详情
      errorDetail = textError.trim() ? textError : errorDetail;
  } catch (e) {
      // 如果读取文本也失败了（可能性很小），就保持用状态码作为信息
      console.error("Failed to read error response body as text", e);
  }

  // **直接在 resultArea 显示错误详情**
  resultArea.innerHTML = `生成图片失败 (后端错误): <pre style="white-space: pre-wrap; word-wrap: break-word; text-align: left;">${errorDetail}</pre>`; // 使用 <pre> 保持换行和空格

  // 出错后，确保按钮可用
  generateButton.disabled = false;
  return; // 阻止后续代码执行 (因为已经出错了)
}

    // 处理成功的图片响应
    const imageBlob = await response.blob(); // 将响应体作为 Blob 对象读取

    // 创建一个临时的 URL 指向这个 Blob 对象
    const imageUrl = URL.createObjectURL(imageBlob);

    // 创建 <img> 元素来显示图片
    resultArea.innerHTML = ''; // 清空加载提示
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = `AI 生成的图片: ${userPrompt}`; // 设置图片的描述文字
    imgElement.style.maxWidth = '100%'; // 让图片自适应宽度
    imgElement.style.height = 'auto';   // 保持宽高比
    imgElement.style.marginTop = '10px'; // 加点上边距

    // 将图片元素添加到结果区域
    resultArea.appendChild(imgElement);

    // (可选) 添加下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    // 基于 prompt 或时间戳生成一个建议的文件名
    const filename = `ai_${userPrompt.substring(0, 20).replace(/\s+/g, '_') || Date.now()}.png`;
    downloadLink.download = filename;
    downloadLink.textContent = '下载图片';
    downloadLink.style.display = 'block';
    downloadLink.style.marginTop = '5px';
    resultArea.appendChild(downloadLink);

  } catch (error) {
    // 显示错误信息
    console.error('调用 AI 或处理图片时出错:', error);
    resultArea.innerHTML = `生成图片失败: ${error.message}`;
  } finally {
    // 无论成功失败，最后都重新启用按钮
    generateButton.disabled = false;
  }
});