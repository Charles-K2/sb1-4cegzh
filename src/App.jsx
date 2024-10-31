import { useState } from 'react'
import { QrReader } from 'react-qr-reader'

function App() {
  const [barcode, setBarcode] = useState('')
  const [scanning, setScanning] = useState(false)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!barcode) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://192.168.15.200:3000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode }),
      })
      
      if (!response.ok) {
        throw new Error('Produto não encontrado')
      }
      
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      setError(error.message)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  const handleScan = (result) => {
    if (result) {
      setBarcode(result.text)
      setScanning(false)
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Consulta de Preços</h1>
          
          {scanning ? (
            <div className="mb-4">
              <QrReader
                onResult={handleScan}
                className="w-full"
                constraints={{ facingMode: 'environment' }}
              />
              <button
                onClick={() => setScanning(false)}
                className="w-full mt-4 bg-red-500 text-white p-2 rounded-lg"
              >
                Cancelar Scanner
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="Digite o código de barras"
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
              
              <button
                onClick={() => setScanning(true)}
                className="w-full bg-green-500 text-white p-2 rounded-lg"
              >
                Escanear Código
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {product && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold">{product.cadp_descricao}</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  R$ {product.cade_prvenda.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Código</p>
                  <p className="font-medium">{product.cadp_codigo}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Estoque</p>
                  <p className="font-medium">{product.cade_estoque1}</p>
                </div>
              </div>
              {product.pecd_protocolo && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-semibold text-yellow-800">Pedido em Andamento</p>
                  <p>Protocolo: {product.pecd_protocolo}</p>
                  <p>Quantidade: {product.pecd_qtde}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App