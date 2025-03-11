
import type { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider"
import { ModalApiInjection } from "naive-ui/lib/modal/src/ModalProvider";
declare global {
  interface Window {
      $message: MessageApiInjection,
      $usemodal: ModalApiInjection,
  }
}
