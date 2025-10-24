// 导入 cheerio
import { load } from 'cheerio';

/**
 * Check if the given HTML content contains Cloudflare Turnstile captcha.
 * @param htmlContent - The HTML content to check.
 * @param threshold - The threshold score to determine if the content contains captcha, default is 90.
 * @returns True if the captcha is found, false otherwise.
 */
const checkIfHtmlContentHasCloudflareTurnstile = (htmlContent: string, threshold: number = 90): boolean => {
  let score = 0;
  try {
    // 使用 cheerio 加载 HTML
    const $ = load(htmlContent);
    // 1. 检测标题
    const title = $('title').text().trim();
    if (title === "Just a moment...") {
      score += 50;
    }
    // 2. 检测 Cloudflare Turnstile 特有的标志
    // 每检测到一个特征，增加得分
    // 检测特定ID的元素
    if ($('#cf-chl-widget-uaryp_response').length > 0) {
      score += 60;
    }
    // 检测以特定前缀开始的ID元素
    $('[id^="cf-chl-widget-"]').each(function(this: any) {
      score += 50;
      return false; // 只计算一次
    });

    $('[id^="turnstile-"]').each(function(this: any) {
      score += 50;
      return false; // 只计算一次
    });
    // 检测具有特定类或属性的元素
    if ($('.cf-turnstile').length > 0 || $('[class*="cf-turnstile"]').length > 0) {
      score += 50;
    }
    if ($('[data-sitekey]').length > 0) {
      score += 30;
    }
    // 3. 检测 JavaScript 特征
    // 查找包含特定 JavaScript 代码的 script 标签
    $('script').each(function(this: any) {
      const scriptContent = $(this).html() || '';
      if (scriptContent.includes('turnstile.render')) {
        score += 40;
      }
      if (scriptContent.includes('cpo.src')) {
        score += 20;
      }
    });
    // 4. 检测文本特征
    const bodyText = $('body').text();
    if (bodyText.includes("Verifying you are human. This may take a few seconds.")) {
      score += 30;
    }
    if (bodyText.includes("Checking if the site connection is secure")) {
      score += 30;
    }
    if (bodyText.includes("Please stand by, while we are checking your browser")) {
      score += 30;
    }
    if (bodyText.includes("This process is automatic. Your browser will redirect")) {
      score += 25;
    }
    // 5. 检测 iframe 特征
    if ($('iframe[src*="challenge-platform"]').length > 0) {
      score += 40;
    }
    // 6. Ray ID 特征
    if ($('.ray-id').length > 0) {
      score += 20;
    }
    // 7. 各验证码解决器的特征检测
    // #cf-challenge-container
    if ($('#cf-challenge-container').length > 0) {
      score += 100;
    }
  } catch (error) {
    // 如果解析失败，回退到简单的字符串匹配
    console.error("HTML 解析失败，回退到字符串匹配方法:", error);
    // 回退逻辑
    if (htmlContent.includes("<title>Just a moment...</title>")) {
      score += 50;
    }
    if (htmlContent.includes("cf-turnstile")) {
      score += 50;
    }
    if (htmlContent.includes("data-sitekey")) {
      score += 30;
    }
    if (htmlContent.includes("https://challenges.cloudflare.com")) {
      score += 40;
    }
  }
  // 根据得分判断是否包含验证码
  return score >= threshold;
};

export { checkIfHtmlContentHasCloudflareTurnstile };