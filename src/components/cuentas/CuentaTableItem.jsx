import { useDispatch } from 'react-redux'
import { deleteCuenta } from '../../store/slices/cuentas'

export default function CuentaTableItem({
  id,
  num,
  clienteId,
  tipo_producto,
  num_cuenta,
  tipo_moneda,
  fecha_creacion,
  sucursal,
  monto,
}) {
  const dispatch = useDispatch()

  const handleDeleteClick = () => {
    dispatch(deleteCuenta(id, clienteId))
  }

  return (
    <tr>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px bg-slate-50 text-black sticky left-0'>
        <div>{id}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
        <div className='text-left'>{tipo_producto}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3'>
        <div className='text-left'>{num_cuenta}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
        <div className='text-left '>{tipo_moneda}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3'>
        <div className='text-left '>{sucursal}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3'>
        <div className='text-left '>{fecha_creacion}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3'>
        <div className='text-left '>{monto}</div>
      </td>

      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px'>
        {
          <div className='space-x-3'>
            {/*<button
              className='btn border-slate-200 hover:border-slate-300 text-orange-500'
              onClick={() => { }}>
              <i className='fa-solid fa-table-list text-lg'></i>
              <span className='ml-2'>Editar</span>
        </button>*/}
            <button
              className='btn border-slate-200 hover:border-slate-300 text-red-500'
              onClick={handleDeleteClick}>
              <i className='fa-solid fa-file-pdf text-lg'></i>
              <span className='ml-2'>Eliminar</span>
            </button>
          </div>
        }
      </td>
    </tr>
  )
}
