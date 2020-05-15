import Head from 'next/head'

import Table from '../components/Table'

import usePDFContent from '../hooks/usePDFContent'

const Home = () => {
  const { loading, content, loadFromURL } = usePDFContent()

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
      <Table content={content} />
    </div>
  )
}

export default Home
