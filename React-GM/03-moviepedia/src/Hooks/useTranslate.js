// dictionary 자료형 구조사용

import { useLocale } from "../contexts/LocaleContext";

const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    "title placeholer": "제목을 입력해주세요",
    "content placeholder": "내용을 입력해주세요",
    "terms of survice": "서비스 이용약관",
    "privary policy": "개인정보 처리방침",
    "load more": "더보기",
    newest: "최신순",
    best: "베스트순",
  },
  en: {
    "confirm button": "OK",
    "cancel button": "Cancle",
    "edit button": "Edit",
    "delete button": "Delete",
    "title placeholer": "Typing title",
    "content placeholder": "Typing content",
    "terms of survice": "Terms of Service",
    "privary policy": "Privacy Policy",
    "load more": "Load more",
    newest: "Newest",
    best: "Best",
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";
  return translate;
}
export default useTranslate;
