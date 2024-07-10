import { useContext, useEffect } from "react";
import { LoginContext } from "../../components/ui/LoginProvider.jsx";
import { NotificationContext } from "./NotificationProvider.jsx";

// 알림 상태를 관리하는 컨텍스트

export function EventSubscriber() {
  const { memberId } = useContext(LoginContext);
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (memberId) {
      const eventSource = new EventSource(`/api/subscribe/${memberId}`);

      eventSource.onmessage = (event) => {
        const data = event.data;
        console.log(event);
        if (!data === null) {
          // 알림 상태 업데이트
          addNotification(data);
        }
      };

      return () => {
        eventSource.close();
      };
    }
  }, [memberId, addNotification]);

  // 이 컴포넌트는 UI를 렌더링하지 않고, 이벤트 수신만을 담당합니다.
  return null;
}
