import { APP_TYPE } from "@/types/App"

const CONTENT_WIDGET_PATHS = ['/content-widget']
const CONTENT_MODAL_PATHS = ['/content-modal']


export function getAppTypeFromPath(path: string) {
  return CONTENT_WIDGET_PATHS.includes(path) ? APP_TYPE.CONTENT_WIDGET :
      CONTENT_MODAL_PATHS.includes(path) ? APP_TYPE.CONTENT_MODAL : APP_TYPE.APP

}