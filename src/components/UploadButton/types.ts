import { State } from '../../hooks/usePDFContent'

export interface UploadButtonProps
  extends Pick<State, 'fileName' | 'loadingStep' | 'error'> {
  loadFromURL: (url: string, fileName: string) => void
}
