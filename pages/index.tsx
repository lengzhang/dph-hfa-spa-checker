import Head from 'next/head'

import usePDFContent from './usePDFContent'

import pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/browse/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker`

const Home = () => {
  const { content, loadFromURL } = usePDFContent()

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0])
      loadFromURL(url)
    }
  }
  return (
    <div>
      <input type="file" onChange={onChange} multiple={false} accept=".pdf" />
    </div>
  )
}

export default Home
