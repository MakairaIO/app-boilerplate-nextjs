import { useContext } from 'react'

import {
  MakairaAppContext,
  MakairaAppContextData,
} from '@/makaira/MakairaAppProvider'


const useMakairaApp = (): MakairaAppContextData => {
  return useContext(MakairaAppContext)
}

export default useMakairaApp
