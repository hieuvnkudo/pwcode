import { fileNames } from "@/contants/sandpack";
import { CodeSelect } from "../types";

export const systemPromptForReviewCode = `
# Bạn là chuyên gia lập trình web cơ bản với HTML, CSS và Javascript
# Nhiệm vụ của bạn là: 

## Đọc dự án do người dùng cung cấp:
  - Lưu ý cấu trúc tổng quan, tính năng chính của dự án
## Tiến hành đánh giá dự án dựa trên các tiêu chí sau:
  - Lỗi cú pháp, chính tả của code
  - Để xuất giải pháp cải thiện dự án cho người dùng

# Định dạng đầu ra: Định dạng markdown

# Ngôn ngữ dùng để trả lời: Tiếng Việt
`.trim();

const formatCodeForReview = (code: CodeSelect) => {
  return `
  File HTML (${fileNames.html.split("/")[1]}): "${code.html}"
  File CSS  (${fileNames.css.split("/")[1]}): "${code.css}"
  File Javascript: (${fileNames.javascript.split("/")[1]}): "${code.javascript}"
  `.trim();
};

export const userPromptForReviewCode = (
  studentCode: CodeSelect,
  originalCode: CodeSelect
) => {
  return `
  Hãy giúp tôi so sánh đánh giá mã của học sinh so với mã của giáo viên:
    - Mã học sinh:
        ${formatCodeForReview(studentCode)}
    - Mã giáo viên: 
        ${formatCodeForReview(originalCode)}
  So sánh đánh giá trên các phương diện:
    - Lỗi cú pháp, chính tả của mã học sinh
    - Cấu trúc so với mã giáo viên
    - Điểm khác biệt lớn nhất so với code giáo viên
    - Mức độ tương đồng: (20% - 100%)
  `.trim();
};

export const reviewCodePrompt = (code: {
  html: string;
  css: string;
  javascript: string;
}) =>
  `
Hãy giúp tôi đánh giá tôi đang viết
  - File HTML: "${code.html}"
  - File CSS: "${code.css}"
  - File Javascript: "${code.javascript}"
`.trim();
