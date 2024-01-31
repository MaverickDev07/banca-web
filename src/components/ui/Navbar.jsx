import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/auth'

export function Navbar() {
  const dispatch = useDispatch(state => state.authState)

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>Pedro</span>

      <button
        onClick={() => dispatch(logout())}
        className='btn btn-outline-danger'>
        <i className='fas fa-sign-out-alt' />
        <span> Salir</span>
      </button>
    </div>
  )
}
