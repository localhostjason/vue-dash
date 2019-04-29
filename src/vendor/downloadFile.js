export function downloadFile(url) {
  try {
    const elemIF = document.createElement("iframe");
    console.log(url);
    elemIF.src = url;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
  } catch (e) {
    console.log('download', e);
  }
}

export function funDownload(content, filename) {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  const blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}
