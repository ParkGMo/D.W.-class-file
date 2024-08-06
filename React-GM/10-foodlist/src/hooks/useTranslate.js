import { useSelector } from "react-redux";
import { useLocale } from "../contexts/LocalContext";

const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    "title placeholder": "이름을 입력해주세요",
    "content placeholder": "내용을 작성해주세요",
    "terms of service": "서비스 이용약관",
    "private policy": "개인정보 처리방침",
    "load more": "더보기",
    newest: "최신순",
    calorie: "칼로리순",
  },
  en: {
    "confirm button": "OK",
    "cancel button": "Cancle",
    "edit button": "Edit",
    "delete button": "Delete",
    "title placeholder": "Typing title",
    "content placeholder": "Typing content",
    "terms of service": "Terms of Service",
    "private policy": "Privacy Policy",
    "load more": "Load more",
    newest: "Newest",
    calorie: "calorie",
  },
};

function useTranslate() {
  // const locale = useLocale();
  // const translate = (key) => dict[locale][key] || "";
  const language = useSelector((state) => state.local.language);

  const translate = (key) => dict[language][key] || "";
  return translate;
}

export default useTranslate;
