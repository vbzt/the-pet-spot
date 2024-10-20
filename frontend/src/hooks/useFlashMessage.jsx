import bus from '../utils/bus'

export default function useFlashMessage(){ 

  const setFlashMessage = (message, type) => {
    bus.emit( 'flash', { message, type } )
  }

  return { setFlashMessage }
}


