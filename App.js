import React from 'react'
import Routes from './src/components/Routes'
import {StoreProvider} from 'easy-peasy'
import store from './src/store/store'

const App = () => {
  return (
    <StoreProvider store={store}>
      <Routes/>
    </StoreProvider>
  )
}

export default App